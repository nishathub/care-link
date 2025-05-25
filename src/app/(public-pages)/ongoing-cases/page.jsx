const OngoingCases = async () => {
  const getProjects = async () => {
    const res = await fetch("http://localhost:3000/api/ongoingProjects");
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };
  const { data } = await getProjects();

  return (
    <div>
      <h1>Ongoing Projects</h1>
      <ul>
        {data.map((project) => (
          <li key={project._id}>{project.projectTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default OngoingCases;
