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
      if (
        window.confirm(
          `Are you sure you want to delete ${props.position} at ${props.company}?`
        )
      ) {
        await axios.delete(`http://localhost:5001/api/applications/${id}`);
        props.setApplications((prev) => {
          return prev.filter((app) => app.id !== id);
        });
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div
      className="card bg-primary w-full max-w-none lg:max-w-none p-2 sm:p-2 lg:p-3 mx-4 sm:mx-8 lg:ml-20 lg:mr-4 my-2 sm:my-2 lg:my-3 flex flex-col relative hover:cursor-pointer"
      onClick={() => console.log(props.id)}
    >
      {/* Delete button and Status section - aligned horizontally in top right */}
      <div className="absolute top-1 right-1 flex items-center gap-1">
        <div className="card bg-accent min-w-fit h-5 flex items-center justify-center text-center text-accent-content text-xs font-bold px-2 py-0 mt-3 whitespace-nowrap">
          {props.status}
        </div>
        <button
          className="w-5 h-5 bg-red-500 text-white border-none rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 z-10 hover:cursor-pointer mx-1 mb-2"
          onClick={(e) => {
            e.stopPropagation();
            deleteApplication(props.id);
          }}
        >
          X
        </button>
      </div>

      {/* Main single row with all content */}
      <div className="flex items-center border-b border-primary-content pb-1 pr-16">
        <h1 className="font-bold text-lg sm:text-lg lg:text-xl text-primary-content mr-3">
          {props.position}
        </h1>
        <span className="text-xs text-slate-600 mr-1">at</span>
        <p className="text-sm text-slate-700 font-medium mr-3">
          {props.company}
        </p>
        {props.salary && (
          <>
            <span className="text-xs text-slate-600 mr-1">•</span>
            <p className="text-sm text-slate-700 font-semibold">
              ${props.salary}
            </p>
          </>
        )}
      </div>

      {/* Bottom section - Show/Hide Details */}
      <div className={`flex flex-col ${isOpen ? "flex-col-reverse" : ""}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDetails();
          }}
          className="hover:text-gray-300 hover:cursor-pointer text-secondary-content border-none ml-auto px-1 py-0 text-xs font-semibold mt-1"
        >
          {isOpen ? "Hide Details" : "Show Details"}
        </button>
        {isOpen && (
          <div className="flex flex-col lg:flex-row mt-1 gap-1 lg:gap-0">
            <p className="text-xs sm:text-sm text-slate-600 font-medium border-none lg:mr-4">
              {formatDate(new Date(props.dateApplied))}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium border-none lg:ml-auto">
              {props.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTile;
