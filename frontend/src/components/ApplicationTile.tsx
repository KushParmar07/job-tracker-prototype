import { useState } from "react";

const ApplicationTile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card bg-primary w-full max-w-none lg:max-w-1/3 p-3 sm:p-4 lg:p-5 mx-4 sm:mx-8 lg:ml-20 lg:mr-4 my-3 sm:my-4 lg:my-5 flex flex-grow">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row border-b-3 border-primary-content justify-between gap-2 sm:gap-0">
        <h1 className="font-bold text-xl sm:text-xl lg:text-2xl text-primary-content pb-1">
          Position Title
        </h1>
        <div className="card bg-accent min-w-fit h-fit sm:h-1/2 justify-around text-center text-accent-content text-xs sm:text-sm font-bold flex-end mb-1 p-0.5 whitespace-nowrap px-2">
          Application Status
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row justify-between mt-2 gap-1 sm:gap-0">
        <p className="text-base sm:text-lg text-slate-700 font-semibold border-none">
          Company Name
        </p>
        <p className="text-sm sm:text-base text-slate-700 font-semibold border-none">
          $70,000
        </p>
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
              Application Date: 01/01/2023
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-semibold border-none lg:ml-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTile;
