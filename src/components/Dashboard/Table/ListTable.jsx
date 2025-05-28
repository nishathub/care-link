const ListTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <table className="table w-full text-center">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={item.image || '/default.jpg'}
                  alt="project"
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td>{item.title}</td>
              <td>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(item)}
                >
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

export default ListTable;
