import trackerLogo from "../assets/tracker_logo.png";

interface NavbarProps {
  onCreateClick: () => void;
}

const Navbar = ({ onCreateClick }: NavbarProps) => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sm:px-6 lg:px-8">
      <h1 className="flex-1 p-3 sm:p-5 lg:p-7 ml-2 sm:ml-6 lg:ml-10 text-base-content text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide border-b-red-400 border-b-2 sm:border-b-3 lg:border-b-4">
        <span className="hidden sm:inline">Tracking Site Prototype</span>
        <span className="sm:hidden">Job Tracker</span>
      </h1>
      <button
        className="btn bg-accent text-accent-content"
        onClick={() => onCreateClick()}
      >
        Create Application
      </button>
      <img
        src={trackerLogo}
        alt="Logo"
        className="h-20 w-20 sm:h-25 sm:w-25 lg:h-30 lg:w-30 flex-none"
      />
    </div>
  );
};

export default Navbar;
