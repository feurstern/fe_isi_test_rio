import React, { useEffect, useState } from "react";
import { Task, Team } from "../models";
import { progress } from "../constant";
import { teamList, taskUpdate } from "../services/api";

type updateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTaskDataProps: Task | null;
  onUpdateTaskProps: (id: number, task: Task) => void;
};

const UpdateTask: React.FC<updateTaskModalProps> = ({
  isOpen,
  selectedTaskDataProps,
  onClose,
  onUpdateTaskProps,
}) => {
  if (!isOpen || !selectedTaskDataProps) return null;

  const [title, setTitle] = useState(selectedTaskDataProps?.title);
  const [taskId, setTaskId] = useState(selectedTaskDataProps.id);
  const [team, setTeam] = useState<Team[]>([]);
  const [description, setDescription] = useState(
    selectedTaskDataProps?.description
  );
  const [status, setStatus] = useState(selectedTaskDataProps?.status_id);
  const [assignedTo, setAssignedTo] = useState(
    selectedTaskDataProps.assigned_to
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.user.id;

  const fetchTeamList = async () => {
    try {
      const res = await teamList();
      console.log("res", res);

      setTeam(res || []);
    } catch (error) {
      console.log("error during fetching the team list", error);
    }
  };

  useEffect(() => {
    fetchTeamList();
  }, []);

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: userId,
        title: title,
        description: description,
        status_id: status.toString(),
        assigned_to: assignedTo.toString(),
      };
      alert('clicked')
      const res = await taskUpdate(taskId, payload);
      if (res.success) {
        alert(res.message);
        onUpdateTaskProps(taskId, res.data);
        onClose();
      }
    } catch (error) {}

    // console.log("update payload", payload);
  };
  //   console.log("team", team);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Update New Task </h2>

        <form onSubmit={handleUpdateTask}>
          <div className="mb-4">
            <label htmlFor="taskTitle" className="block font-medium mb-1">
              Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="taskTitle"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="taskDescription" className="block font-medium mb-1">
              Task Description
            </label>
            <textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter task description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="progressStatus" className="block font-medium mb-1">
              Progress Status :
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option disabled>select</option>
              {progress.map((x, i) => (
                <option key={`${i}`} value={`${x.id}`}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTo" className="block font-medium mb-1">
              Assign to
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(Number(e.target.value))}
            >
              <option value="" disabled>
                select
              </option>
              {team.map((x, i) => (
                <option key={`${x.id}`} value={`${x.id}`}>
                  {i + 1}. {x.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
