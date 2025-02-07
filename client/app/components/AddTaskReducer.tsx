import React, { useEffect, useReducer } from "react";
import { AddTaskActions, AddTaskState, Team } from "../models";
import { TaskList } from "../models";

import { teamList, statusList, taskSubmit } from "../services/api";
import { progress } from "../constant";
import { title } from "process";
type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewTaskProps: (task: TaskList) => void;
};

const reducer = (state: AddTaskState, action: AddTaskActions): AddTaskState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload as string };

    case "SET_DESCRIPTION":
      return { ...state, description: action.payload as string };

    case "SET_STATUS":
      return { ...state, status: action.payload as string };

    case "SET_ASSIGNED_TO":
      return { ...state, assignedTo: action.payload as string };

    case "SET_Team":
      return { ...state, team: action.payload as Team[] };

    case "SET_SELECTED_STATUS_ID":
      return { ...state, selectedStatusId: action.payload as string };
    default:
      return state;
  }
};

const user = JSON.parse(localStorage.getItem("user") || "{}");
const id: string = user?.user?.id;

const AddTaskReducer: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onNewTaskProps,
}) => {
  if (!isOpen) return null;
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    assignedTo: "",
    status: "1",
    description: "",
    team: [
      {
        id: 0,
        name: "",
        email: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        role_id: 0,
      },
    ],
    selectedStatusId: "",
  });

  const fetchStatusList = async () => {
    try {
      const res = await statusList();
      if (res.success) {
        dispatch({ type: "SET_STATUS", payload: res.data });
      } else {
        alert("error during fethcing the statuslist");
      }
    } catch (error) {
      alert(`error during fetching the statuslist : ${error}`);
    }
  };

  const fetchTeamList = async () => {
    try {
      const res = await teamList();

      if (res.success) {
        dispatch({ type: "SET_Team", payload: res.data });
      }
    } catch (error) {}
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        id: id,
        title: state.title,
        description: state.title,
        status_id: state.selectedStatusId,
        assigned_to: state.assignedTo,
      };

      const res = await taskSubmit(payload);

      if (res.success) {
        alert("data has been submitted succesfully!");
        onNewTaskProps(res.data);
      }
    } catch (error) {
      alert(`error during submitting the fucking data ${error}`);
      dispatch({ type: "SET_SELECTED_STATUS_ID", payload: "1" });
    }
  };

  useEffect(() => {
    fetchStatusList();
    fetchTeamList();
  }, []);

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
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "SET_TITLE", payload: e.target.value })
              }
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
              value={state.description}
              onChange={(e) =>
                dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter task description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="progressStatus" className="block font-medium mb-1">
              Progress Status :
            </label>
            <select
              value={state.selectedStatusId}
              onChange={(e) =>
                dispatch({ type: "SET_STATUS", payload: e.target.value })
              }
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
              value={state.assignedTo}
              onChange={(e) =>
                dispatch({ type: "SET_ASSIGNED_TO", payload: e.target.value })
              }
            >
              <option value="" disabled>
                select
              </option>
              {state.team.map((x, i) => (
                <option key={`${x.id}`} value={`${x.id}`}>
                  {i + 1}. {x.name}
                </option>
              ))}
            </select>
          </div>
          selected status id : {state.selectedStatusId}
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

export default AddTaskReducer;
