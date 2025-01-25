import React, { useState } from "react";

type createTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTask: React.FC<createTaskModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create New Task</h2>

        {/* Form for creating a task */}
        <form>
          <div className="mb-4">
            <label htmlFor="taskTitle" className="block font-medium mb-1">
              Task Title
            </label>
            <input
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
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter task description"
            />
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
