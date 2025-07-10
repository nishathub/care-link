import LoginForm from "@/components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-800 px-2">
      <div className="w-full max-w-md bg-gray-300 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-6">
          Login
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
