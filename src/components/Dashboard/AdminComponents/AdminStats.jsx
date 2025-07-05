const AdminStats = () => {
  // Example data
  const stats = [
    { label: "Total Donations", value: "$25,400" },
    { label: "Active Volunteers", value: "320" },
    { label: "Pending Reviews", value: "12" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-sky-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-sm">{stat.label}</h2>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
