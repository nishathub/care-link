'use client';

const Error = ({ error, reset }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 text-center px-4">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-red-600">Something went wrong</h2>
        <p className="mt-2 text-gray-700">{error?.message || "Unknown error occurred."}</p>
        <button
          onClick={() => reset()}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
