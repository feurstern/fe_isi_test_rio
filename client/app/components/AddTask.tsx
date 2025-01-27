"use client";
import React, { useEffect, useState } from "react";
import { progress } from "../constant";
import { teamList, taskSubmit, statusList } from "../services/api";
import { Task, Team } from "../models";

type createTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewTaskProps: (task: Task) => void;
};

const AddTask: React.FC<createTaskModalProps> = ({
  isOpen,
  onClose,
  onNewTaskProps,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [team, setTeam] = useState<Team[]>([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id: string = user?.user?.id;

  const fetchTeamList = async () => {
    try {
      const team = await teamList();
      setTeam(team || []);
    } catch (error) {}
  };

  const fetchStatusList = async () => {
    try {
      const res = await statusList();
      setStatus(res);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTeamList();
    fetchStatusList();
  }, []);

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: id,
        title: title,
        description: description,
        status_id: status,
        assigned_to: assignedTo,
      };
      const res = await taskSubmit(payload);

      console.log("payload", payload);
      if (res.success) {
        alert("data has been submitted succesfully");
        onNewTaskProps(res.data);
        onClose();
      } else {
        alert("eerorr!");
      }
    } catch (error) {
      console.log("error during submitting the daata", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create New Task</h2>

        <form onSubmit={submitData}>
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
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
              onChange={(e) => setAssignedTo(e.target.value)}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
