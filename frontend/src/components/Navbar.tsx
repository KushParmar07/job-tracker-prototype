import trackerLogo from "../assets/tracker_logo.png";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <h1 className="flex-1 p-7 ml-10 text-base-content text-2xl font-semibold tracking-wide border-b-red-400 border-b-4">Tracking Site Prototype</h1>
            <img src={trackerLogo} alt="Logo" className="h-30 w-30 flex-none" />
        </div>
    )
}

export default Navbar