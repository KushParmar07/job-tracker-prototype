import "./App.css";
import ApplicationTile from "./components/ApplicationTile";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import type Application from "./models/Application";
import CreateApplicationModal from "./components/CreateApplication";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);

  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null);

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

  const openModal = () => {
    (
      document.getElementById("createApplicationModal") as HTMLDialogElement
    )?.showModal();
  };

  const closeModal = () => {
    (
      document.getElementById("createApplicationModal") as HTMLDialogElement
    )?.close();
  };

  const handleCreateApplication = async () => {
    setCurrentApplication(null);
    openModal();
  };

  const handleEditApplication = async (application: Application) => {
    setCurrentApplication(application);
    openModal();
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#14181c_60%,#8B0000_100%)]" />
      <Navbar onCreateClick={handleCreateApplication} />
      <div className="container px-4 sm:px-6 lg:px-8">
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <ApplicationTile
                application={application}
                setApplications={setApplications}
                onEditClick={handleEditApplication}
              />
            </li>
          ))}
        </ul>
      </div>
      <CreateApplicationModal
        refreshApplications={fetchApplications}
        editingApplication={currentApplication}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
