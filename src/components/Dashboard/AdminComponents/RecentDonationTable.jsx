const RecentDonationTable = () => {
  const recentDonations = [
    {
      id: 1,
      donor: "John Doe",
      amount: "$200",
      date: "2025-07-02",
      status: "Completed",
    },
    {
      id: 2,
      donor: "Jane Smith",
      amount: "$150",
      date: "2025-07-01",
      status: "Pending",
    },
    {
      id: 3,
      donor: "Robert Johnson",
      amount: "$500",
      date: "2025-06-30",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-sky-100 p-6 rounded-2xl shadow-md overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Donor</th>
            <th className="py-2 px-4">Tag</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentDonations.map((donation, index) => (
            <tr key={donation.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{donation.donor}</td>
              <td className="py-2 px-4">{"education"}</td>
              <td className="py-2 px-4">{donation.amount}</td>
              <td className="py-2 px-4">{donation.date}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    donation.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {donation.status}
                </span>
              </td>
              <td className="py-2 px-4 flex gap-3">
                <button className="text-sky-700 hover:underline text-xs">
                  Edit
                </button>
                <button className="text-red-600 hover:underline text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDonationTable;
