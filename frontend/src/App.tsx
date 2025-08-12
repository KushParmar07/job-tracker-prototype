import "./App.css";
import ApplicationTile from "./components/ApplicationTile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#14181c_60%,#8B0000_100%)]" />
      <Navbar />
      <div className="container px-4 sm:px-6 lg:px-8">
        <ApplicationTile />
      </div>
    </div>
  );
}

export default App;
