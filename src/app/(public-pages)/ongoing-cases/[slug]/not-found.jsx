const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center px-4">
      <div>
        <h1 className="text-3xl lg:text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl lg:text-3xl mt-4 font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
