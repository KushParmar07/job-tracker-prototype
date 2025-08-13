import { useState } from "react";
import { formatDate } from "../lib/utils";
import axios from "axios";
import type Application from "../models/Application";

interface ApplicationTileProps {
  application: Application;
  setApplications: React.Dispatch<React.SetStateAction<any[]>>;
  onEditClick: (application: Application) => void;
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
          `Are you sure you want to delete ${props.application.position} at ${props.application.companyName}?`
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
      onClick={() => {
        props.onEditClick(props.application);
      }}
    >
      <div className="absolute top-1 right-1 flex items-center gap-1">
        <div
          className={`card min-w-fit h-5 flex items-center justify-center text-center text-xs font-bold px-2 py-0 mt-3 whitespace-nowrap ${
            props.application.currentStatus.name === "Applied"
              ? "bg-blue-500 text-white"
              : props.application.currentStatus.name === "Interviewing"
              ? "bg-yellow-500 text-black"
              : props.application.currentStatus.name === "Offer"
              ? "bg-green-500 text-gray-200"
              : props.application.currentStatus.name === "Rejected"
              ? "bg-red-500 text-white"
              : ""
          }`}
        >
          {props.application.currentStatus.name}
        </div>
        <button
          className="w-5 h-5 bg-red-500 text-white border-none rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 z-10 hover:cursor-pointer mx-1 mb-2"
          onClick={(e) => {
            e.stopPropagation();
            deleteApplication(props.application.id);
          }}
        >
          X
        </button>
      </div>

      {/* Main single row with all content */}
      <div className="flex items-center border-b border-primary-content pb-1 pr-16">
        <h1 className="font-bold text-lg sm:text-lg lg:text-xl text-primary-content mr-3">
          {props.application.position}
        </h1>
        <span className="text-xs text-slate-600 mr-1">at</span>
        <p className="text-sm text-slate-700 font-medium mr-3">
          {props.application.companyName}
        </p>
        {props.application.salary && (
          <>
            <span className="text-xs text-slate-600 mr-1">•</span>
            <p className="text-sm text-slate-700 font-semibold">
              ${props.application.salary}
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
              {formatDate(new Date(props.application.dateApplied))}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium border-none lg:ml-auto">
              {props.application.jobDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTile;
