import { projects } from "../data/projects";
import ProjectCard from "../components/project/ProjectCard";
import { useState } from "react";
import PlatformModal from "../components/project/PlatformModal";
import { useNavigate } from "react-router-dom";

function Projects() {

    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="text-4xl font-bold">
          Game QA Management System
        </h1>

        <p className="mt-2 text-slate-600">
          Manage all your game testing projects in one place.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
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