import React from "react";

const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLogoClick = () => {
    // Always scroll to top, no reload
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-xl font-bold text-indigo-600">&lt;/&gt;</div>
            <span className="text-lg font-bold text-slate-900">Snapcode</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("examples")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Examples
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
