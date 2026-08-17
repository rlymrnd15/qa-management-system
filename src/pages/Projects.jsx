import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/project/ProjectCard";
import PlatformModal from "../components/project/PlatformModal";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectUpdates, setProjectUpdates] = useState({});

  const navigate = useNavigate();

  const user = auth.currentUser;

  // ==========================================
  // LOAD PROJECT ACTIVITY IN REAL TIME
  // ==========================================
  useEffect(() => {
    let activityData = {
      bugs: [],
      builds: [],
      deviceTests: [],
      testCases: [],
    };

    const updateProjectActivity = () => {
      const allActivity = [
        ...activityData.bugs.map((item) => ({
          ...item,
          type: "bug",
        })),

        ...activityData.builds.map((item) => ({
          ...item,
          type: "build",
        })),

        ...activityData.deviceTests.map((item) => ({
          ...item,
          type: "deviceTest",
        })),

        ...activityData.testCases.map((item) => ({
          ...item,
          type: "testCase",
        })),
      ];

      const latestUpdates = {};

      projects.forEach((project) => {
        const projectActivity = allActivity.filter(
          (item) => item.game === project.slug
        );

        // ------------------------------------------
        // NO ACTIVITY
        // ------------------------------------------
        if (projectActivity.length === 0) {
          latestUpdates[project.slug] = null;
          return;
        }

        // ------------------------------------------
        // GET ACTIVITY DATE
        // ------------------------------------------
        const getActivityDate = (item) => {
          // Firestore updatedAt
          if (
            item.updatedAt &&
            typeof item.updatedAt.toDate === "function"
          ) {
            return item.updatedAt.toDate();
          }

          // Firestore createdAt
          if (
            item.createdAt &&
            typeof item.createdAt.toDate === "function"
          ) {
            return item.createdAt.toDate();
          }

          // Older build records
          const getActivityDate = (item) => {
            if (
              item.updatedAt &&
              typeof item.updatedAt.toDate === "function"
            ) {
              return item.updatedAt.toDate();
            }

            if (
              item.createdAt &&
              typeof item.createdAt.toDate === "function"
            ) {
              return item.createdAt.toDate();
            }

            return null;
          };

          return new Date(0);
        };

        // ------------------------------------------
        // FIND MOST RECENT ACTIVITY
        // ------------------------------------------
        const latest = projectActivity.reduce(
          (latestItem, currentItem) => {
            const latestDate =
              getActivityDate(latestItem) ||
              new Date(0);

            const currentDate =
              getActivityDate(currentItem) ||
              new Date(0);

            return currentDate > latestDate
              ? currentItem
              : latestItem;
          }
        );

        latestUpdates[project.slug] =
          getActivityDate(latest);
      });

      setProjectUpdates(latestUpdates);
    };

    // ==========================================
    // BUG REPORTS LISTENER
    // ==========================================
    const unsubscribeBugs = onSnapshot(
      collection(db, "bugReports"),
      (snapshot) => {
        activityData.bugs = snapshot.docs.map(
          (document) => ({
            ...document.data(),
            id: document.id,
          })
        );

        updateProjectActivity();
      },
      (error) => {
        console.error(
          "Error listening to bug reports:",
          error
        );
      }
    );

    // ==========================================
    // BUILDS LISTENER
    // ==========================================
    const unsubscribeBuilds = onSnapshot(
      collection(db, "deviceBuilds"),
      (snapshot) => {
        activityData.builds = snapshot.docs.map(
          (document) => ({
            ...document.data(),
            id: document.id,
          })
        );

        updateProjectActivity();
      },
      (error) => {
        console.error(
          "Error listening to builds:",
          error
        );
      }
    );

    // ==========================================
    // DEVICE TESTS LISTENER
    // ==========================================
    const unsubscribeDeviceTests = onSnapshot(
      collection(db, "deviceTests"),
      (snapshot) => {
        activityData.deviceTests =
          snapshot.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));

        updateProjectActivity();
      },
      (error) => {
        console.error(
          "Error listening to device tests:",
          error
        );
      }
    );

    // ==========================================
    // TEST CASES LISTENER
    // ==========================================
    const unsubscribeTestCases = onSnapshot(
      collection(db, "testCases"),
      (snapshot) => {
        activityData.testCases =
          snapshot.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));

        updateProjectActivity();
      },
      (error) => {
        console.error(
          "Error listening to test cases:",
          error
        );
      }
    );

    // ==========================================
    // CLEANUP LISTENERS
    // ==========================================
    return () => {
      unsubscribeBugs();
      unsubscribeBuilds();
      unsubscribeDeviceTests();
      unsubscribeTestCases();
    };
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  };

  // ==========================================
  // FORMAT LAST UPDATED
  // ==========================================
  const formatLastUpdated = (date) => {
    if (!date) {
      return "No activity yet";
    }

    const now = new Date();

    const diffMs = now - date;

    // Prevent negative values
    if (diffMs < 0) {
      return "Just now";
    }

    const diffSeconds = Math.floor(
      diffMs / 1000
    );

    const diffMinutes = Math.floor(
      diffSeconds / 60
    );

    const diffHours = Math.floor(
      diffMinutes / 60
    );

    const diffDays = Math.floor(
      diffHours / 24
    );

    // ------------------------------------------
    // LESS THAN ONE MINUTE
    // ------------------------------------------
    if (diffSeconds < 60) {
      return "Just now";
    }

    // ------------------------------------------
    // LESS THAN ONE HOUR
    // ------------------------------------------
    if (diffMinutes < 60) {
      return `${diffMinutes} ${
        diffMinutes === 1
          ? "minute"
          : "minutes"
      } ago`;
    }

    // ------------------------------------------
    // LESS THAN ONE DAY
    // ------------------------------------------
    if (diffHours < 24) {
      return `${diffHours} ${
        diffHours === 1
          ? "hour"
          : "hours"
      } ago`;
    }

    // ------------------------------------------
    // EXACTLY ONE DAY
    // ------------------------------------------
    if (diffDays === 1) {
      return "Yesterday";
    }

    // ------------------------------------------
    // MULTIPLE DAYS
    // ------------------------------------------
    return `${diffDays} days ago`;
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========================================
          HEADER
      ======================================== */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">

        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-bold">
            Game QA Management System
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all your game testing projects in one place.
          </p>
        </div>

        {/* USER */}
        <div className="flex items-center gap-4">

          {/* PROFILE IMAGE */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {user?.displayName?.charAt(0) ||
                "U"}
            </div>
          )}

          {/* USER INFO */}
          <div className="hidden text-right sm:block">
            <p className="font-semibold">
              {user?.displayName || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>

        </div>
      </header>

      {/* ========================================
          MAIN CONTENT
      ======================================== */}
      <main className="px-8 py-8">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={{
                ...project,

                lastUpdated:
                  formatLastUpdated(
                    projectUpdates[
                      project.slug
                    ]
                  ),
              }}

              onOpen={() => {
                setSelectedProject(project);
                setModalOpen(true);
              }}
            />
          ))}

        </div>

      </main>

      {/* ========================================
          PLATFORM MODAL
      ======================================== */}
      <PlatformModal
        project={selectedProject}
        isOpen={modalOpen}

        onClose={() => {
          setModalOpen(false);
        }}

        onSelectPlatform={(platform) => {
          setModalOpen(false);

          navigate(
            `/workspace/${selectedProject.slug}/${platform.toLowerCase()}`
          );
        }}
      />

    </div>
  );
}

export default Projects;