import axios from "axios";
import { useState, useEffect } from "react";
import type Application from "../models/Application";

interface CreateApplicationModalProps {
  refreshApplications: () => Promise<void>;
  editingApplication: Application | null;
  closeModal: () => void;
  modalOpen: boolean;
}

const createApplicationModal = ({
  refreshApplications,
  editingApplication,
  closeModal,
  modalOpen,
}: CreateApplicationModalProps) => {
  const [statuses, setStatuses] = useState<{ id: string; name: string }[]>([]);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState<number | undefined>(undefined);
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

  // Called when an application tile is clicked on to be edited
  const fillFormForEdit = () => {
    if (editingApplication) {
      setPosition(editingApplication.position);
      setCompany(editingApplication.companyName);
      setSalary(editingApplication.salary || undefined);
      setDescription(editingApplication.jobDescription || "");
      setStatus(editingApplication.currentStatus.name);
    }
  };

  const clearForm = () => {
    setPosition("");
    setCompany("");
    setSalary(undefined);
    setDescription("");
    setStatus("");
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

      closeModal();
      clearForm();
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

  const updateApplication = async (
    position: string,
    company: string,
    salary: number,
    description: string,
    status: string
  ) => {
    try {
      if (!editingApplication) {
        return;
      }
      await axios.put(
        `http://localhost:5001/api/applications/${editingApplication.id}`,
        {
          position,
          companyName: company,
          salary,
          jobDescription: description,
          statusName: status,
        }
      );

      closeModal();
      clearForm();
      await refreshApplications();
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleUpdateApplication = async () => {
    if (!editingApplication) {
      return;
    }

    await updateApplication(
      position,
      company,
      salary ? Number(salary) : 0,
      description,
      status
    );
  };

  useEffect(() => {
    getStatuses();
    if (editingApplication) {
      fillFormForEdit();
    }
    if (!modalOpen) {
      // Delay to ensure the modal finishes closing before clearing the form
      const timeoutId = setTimeout(() => {
        clearForm();
      }, 300);

      return () => clearTimeout(timeoutId);
    }

    //handling modal close
    const modal = document.getElementById(
      "createApplicationModal"
    ) as HTMLDialogElement;

    if (modal) {
      modal.addEventListener("close", closeModal);
    }

    return () => {
      if (modal) {
        modal.removeEventListener("close", closeModal);
      }
    };
  }, [editingApplication, modalOpen]);

  return (
    <>
      <dialog id="createApplicationModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
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
              value={salary || ""}
              onChange={(e) =>
                setSalary(e.target.value ? Number(e.target.value) : undefined)
              }
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
              onClick={() => {
                editingApplication
                  ? handleUpdateApplication()
                  : handleCreateApplication();
              }}
            >
              {editingApplication ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default createApplicationModal;
