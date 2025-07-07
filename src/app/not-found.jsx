import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center px-4 bg-sky-800 text-white">
      <div>
        <h1 className="text-3xl lg:text-6xl font-bold text-red-800">404</h1>
        <h2 className="text-2xl lg:text-3xl mt-4 font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-100">Sorry, the page you are looking for does not exist.</p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
