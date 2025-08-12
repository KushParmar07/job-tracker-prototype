import { useState } from "react";
import { formatDate } from "../lib/utils";
import axios from "axios";

interface ApplicationTileProps {
  company: string;
  position: string;
  dateApplied: string;
  status: string;
  salary?: string | null;
  description?: string;
  id: string;
  setApplications: React.Dispatch<React.SetStateAction<any[]>>;
}

const ApplicationTile = (props: ApplicationTileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const deleteApplication = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`);
      props.setApplications((prev) => {
        return prev.filter((app) => app.id !== id);
      });
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="card bg-primary w-full max-w-none lg:max-w-none p-3 sm:p-4 lg:p-5 mx-4 sm:mx-8 lg:ml-20 lg:mr-4 my-3 sm:my-4 lg:my-5 flex flex-grow">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row border-b-3 border-primary-content justify-between gap-2 sm:gap-0">
        <h1 className="font-bold text-xl sm:text-xl lg:text-2xl text-primary-content pb-1">
          {props.position}
        </h1>
        <div className="flex flex-row items-center gap-2">
          <div className="card bg-accent min-w-fit h-8 flex items-center justify-center text-center text-accent-content text-xs sm:text-sm font-bold px-3 py-1 whitespace-nowrap">
            {props.status}
          </div>
          <button
            className="btn bg-red-500 text-white border-none h-8 px-3 py-1 text-xs sm:text-sm font-semibold hover:bg-red-600"
            onClick={() => deleteApplication(props.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row justify-between mt-2 gap-1 sm:gap-0">
        <p className="text-base sm:text-lg text-slate-700 font-semibold border-none">
          {props.company}
        </p>
        {props.salary && (
          <p className="text-sm sm:text-base text-slate-700 font-semibold border-none">
            {`$${props.salary}`}
          </p>
        )}
      </div>

      {/* Bottom section */}
      <div className={`flex flex-col ${isOpen ? "flex-col-reverse" : ""}`}>
        <button
          onClick={toggleDetails}
          className="btn bg-secondary text-secondary-content border-none max-h-5.5 ml-auto px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold"
        >
          {isOpen ? "Hide Details" : "Show Details"}
        </button>
        {isOpen && (
          <div className="flex flex-col lg:flex-row mt-2 gap-2 lg:gap-0">
            <p className="text-sm sm:text-base text-slate-600 font-semibold border-none lg:mr-4">
              {formatDate(new Date(props.dateApplied))}
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-semibold border-none lg:ml-auto">
              {props.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTile;
