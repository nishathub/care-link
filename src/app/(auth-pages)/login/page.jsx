import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    
    <div className="w-full max-w-2xl m-auto bg-gray-300 rounded-xl shadow-2xl p-4 sm:p-8 mt-20">
      <h2 className="text-xl md:text-3xl font-semibold text-center text-gray-900 mb-6">
        Login Here
      </h2>
      <LoginForm />
      <div className="mt-4">
        <h2>
          Not a volunteer yet?
          <Link
            href={"/register-volunteer"}
            className="text-sky-600 hover:text-sky-700 duration-300 ml-2 font-semibold"
          >
            Register
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
