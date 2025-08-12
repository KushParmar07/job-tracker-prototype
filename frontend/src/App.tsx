import "./App.css";
import ApplicationTile from "./components/ApplicationTile";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  [key: string]: any;
}

function App() {
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/applications"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  console.log("Got applications", applications);

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#14181c_60%,#8B0000_100%)]" />
      <Navbar refreshApplications={fetchApplications} />
      <div className="container px-4 sm:px-6 lg:px-8">
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <ApplicationTile
                company={application.companyName}
                position={application.position}
                dateApplied={application.dateApplied}
                status={application.currentStatus.name}
                salary={application.salary}
                description={application.jobDescription}
                id={application.id}
                setApplications={setApplications}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
