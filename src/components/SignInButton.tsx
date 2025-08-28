import React from "react";
import { signIn } from "next-auth/react";

const SignInButton: React.FC = () => {
  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 hover:opacity-90 transition-all duration-200 font-medium shadow-sm"
    >
      Sign in with Google
    </button>
  );
};

export default SignInButton;
