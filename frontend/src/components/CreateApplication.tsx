import axios from "axios";
import { useState, useEffect } from "react";

interface CreateApplicationModalProps {
  refreshApplications: () => Promise<void>;
  selectedTileId?: string;
}

const createApplicationModal = ({
  refreshApplications,
  selectedTileId,
}: CreateApplicationModalProps) => {
  const [statuses, setStatuses] = useState<{ id: string; name: string }[]>([]);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const getStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/status");
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
      return [];
    }
  };

  const fillFormForEdit = () => {
    if (selectedTileId) {
      axios
        .get(`http://localhost:5001/api/applications/${selectedTileId}`)
        .then((response) => {
          const data = response.data;
          setPosition(data.position);
          setCompany(data.companyName);
          setSalary(data.salary);
          setDescription(data.jobDescription);
          setStatus(data.statusName);
        });
      console.log(selectedTileId);
    }
  };

  const createApplication = async (
    position: string,
    company: string,
    salary: number,
    description: string,
    status: string
  ) => {
    try {
      await axios.post("http://localhost:5001/api/applications", {
        position: position,
        companyName: company,
        salary: salary,
        jobDescription: description,
        statusName: status,
      });

      setPosition("");
      setCompany("");
      setSalary("");
      setDescription("");
      setStatus("");

      const modal = document.getElementById(
        "createApplicationModal"
      ) as HTMLDialogElement;
      modal?.close();

      await refreshApplications();
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  const handleCreateApplication = async () => {
    if (!position.trim() || !company.trim() || !status.trim()) {
      alert(
        "Please fill in all required fields: Position, Company, and Status"
      );
      return;
    }

    await createApplication(
      position,
      company,
      salary ? Number(salary) : 0,
      description,
      status
    );
  };

  useEffect(() => {
    getStatuses();
    if (selectedTileId) {
      console.log("Filling form for edit");
      fillFormForEdit();
    }
  }, []);

  return (
    <>
      <button
        className="btn bg-accent text-accent-content"
        onClick={() =>
          (
            document.getElementById(
              "createApplicationModal"
            ) as HTMLDialogElement
          )?.showModal()
        }
      >
        Create Application
      </button>
      <dialog id="createApplicationModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg my-3">Create a new application</h3>
            <input
              type="text"
              placeholder="Position title"
              className="input"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Company name"
              className="input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></input>
            <input
              type="number"
              placeholder="Salary (optional)"
              className="input"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            ></input>
            <textarea
              className="textarea"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <select
              className="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled>
                Select status
              </option>
              {statuses.map((statusOption) => (
                <option key={statusOption.id} value={statusOption.name}>
                  {statusOption.name}
                </option>
              ))}
            </select>
            <button
              className="btn bg-accent text-accent-content"
              onClick={handleCreateApplication}
            >
              Create
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default createApplicationModal;
