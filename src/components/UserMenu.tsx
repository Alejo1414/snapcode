import React from "react";
import { useSession, signOut } from "next-auth/react";

const UserMenu: React.FC = () => {
  const { data: session } = useSession();

  // If not logged in, render nothing
  if (!session?.user) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        {session.user.image && (
          <img
            src={session.user.image}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        )}

        {/* User email */}
        <div className="text-sm">
          <p className="text-gray-900 font-medium">{session.user.email}</p>
        </div>
      </div>

      {/* Sign out button */}
      <button
        onClick={handleSignOut}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 hover:opacity-90 transition-all duration-200 font-medium text-sm"
      >
        Sign out
      </button>
    </div>
  );
};

export default UserMenu;
