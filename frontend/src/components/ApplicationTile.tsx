const ApplicationTile = () => {
  return (
    <div className="card bg-primary w-1/3 p-5 ml-20 my-5 flex ">
      {/* Header section */}
      <div className="flex flex-row border-b-3 border-primary-content">
        <h1 className="text-lg font-bold text-primary-content pb-1 flex-1">
          Position Title
        </h1>
        <div className="card bg-accent min-w-fit h-1/2 justify-around text-center text-accent-content text-sm font-bold flex-end mb-1 p-0.5 whitespace-nowrap px-2">
          Application Status
        </div>
      </div>

      {/* Main content */}
      <p>Test</p>
    </div>
  );
};

export default ApplicationTile;
