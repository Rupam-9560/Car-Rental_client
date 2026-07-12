import { SignupForm } from "@/components/signup-form";


const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
