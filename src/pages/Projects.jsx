import { projects } from "../data/projects";
import ProjectCard from "../components/project/ProjectCard";
import { useState } from "react";
import PlatformModal from "../components/project/PlatformModal";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";



function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">

        <div>
          <h1 className="text-2xl font-bold">
            Game QA Management System
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all your game testing projects in one place.
          </p>
        </div>

        {/* User */}
        <div className="flex items-center gap-4">

          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}

          <div className="hidden text-right sm:block">
            <p className="font-semibold">
              {user?.displayName || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>

        </div>

      </header>

      {/* Main Content */}
      <main className="px-8 py-8">


        {/* Project Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => {
                setSelectedProject(project);
                setModalOpen(true);
              }}
            />
          ))}

        </div>

      </main>

      {/* Platform Modal */}
      <PlatformModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
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