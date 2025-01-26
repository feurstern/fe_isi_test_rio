import React from "react";
import { Task } from "../models";

type TaskCardProps = {
  taskListDataProps: Task[];
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onDetail: (taskId: number) => void;
  checkStatus: (statusId: number) => string;
  checkStatusColour: (statusId: number) => string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  taskListDataProps,
  onEdit,
  onDelete,
  onDetail,
  checkStatus,
  checkStatusColour,
}) => {
  return (
    <ul className="space-y-4">
      {taskListDataProps.map((task) => (
        <li
          key={task.id}
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">
            {task.title}{" "}
            <span
              className={`${checkStatusColour(task.status_id)} text-white rounded px-4`}
            >
              {checkStatus(task.status_id)}
            </span>
          </h2>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-sm text-gray-500">
            Created At: {new Date(task.created_at).toLocaleDateString()}
          </p>
        
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => onEdit(task.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDetail(task.id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Detail
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskCard;
