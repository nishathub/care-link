import Link from "next/link";

const RegistrationSuccessPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Registration Submitted</h1>
        <p className="mb-2">
          Thank you for registering with <strong>CareLink</strong>!
        </p>
        <p className="mb-2">
          Please check your email for further instructions.
        </p>
        <p>
          Our team will review your profile and notify you once it is approved.
        </p>
        <div className="mt-12">
          <Link className="btn font-cinzel" href={"/"}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RegistrationSuccessPage;
