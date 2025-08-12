import "./App.css";
import ApplicationTile from "./components/ApplicationTile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#14181c_60%,#8B0000_100%)]" />
      <Navbar />
      <div className="container px-4 sm:px-6 lg:px-8">
        <map name="job-application-tiles">
          <ApplicationTile
            company="Company A"
            position="Software Engineer"
            dateApplied="2023-01-01"
            status="Applied"
            salary="$100,000"
            description="Developing web applications"
          />
          <ApplicationTile
            company="Company B"
            position="Product Manager"
            dateApplied="2023-02-01"
            status="Interview"
            salary="$120,000"
            description="Managing product development"
          />
        </map>
      </div>
    </div>
  );
}

export default App;
