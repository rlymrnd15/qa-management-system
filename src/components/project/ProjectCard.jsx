function ProjectCard({ project, onOpen }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* Game Image */}
      <img
        src={project.image}
        alt={project.name}
        className="h-48 w-full object-cover"
      />

      {/* Card Content */}
      <div className="p-6">

        <h2 className="text-2xl font-semibold">
          {project.name}
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Platforms
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {project.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm"
            >
              {platform}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Last Updated
        </p>

        <p>{project.lastUpdated}</p>

        <button
          onClick={onOpen}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Open Project
        </button>

      </div>
    </div>
  );
}

export default ProjectCard;