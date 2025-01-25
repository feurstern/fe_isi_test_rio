"use client";

import React, { useEffect, useState } from "react";
import { taskList } from "../services/api";
import { Task } from "../models";
import AddTask from "../components/AddTask";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const tasksPerPage = 5;

  const fetchTasks = async () => {
    try {
      const tasks = await taskList();
      setTasks(tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (taskId: number) => {
    console.log(`Edit task with ID: ${taskId}`);
  };

  const checkStatus = (statusId: number): string => {
    return statusId == 1
      ? "Not started"
      : statusId == 2
      ? "On Progress"
      : statusId == 3
      ? "Done"
      : "Rejected";
  };

  const checkStatusColour = (statusId: number): string => {
    return statusId == 1
      ? "bg-gray-500"
      : statusId == 2
      ? "bg-blue-500"
      : statusId == 3
      ? "bg-green-500"
      : "bg-red-500";
  };

  const handleOpenModal = () => {
    setIsCreateModalOpened(true);
  };


  const handleCloseModal = ()=>{
    setIsCreateModalOpened(false)
  }

  const handleDetail = (taskId: number) => {
    console.log(`View details for task with ID: ${taskId}`);
    const selectedData = tasks.filter((x) => x.id === taskId);
    console.log("selected data", selectedData);
  };

  const handleDelete = (taskId: number) => {
    console.log(`Delete task with ID: ${taskId}`);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Task List {isCreateModalOpened}</h1>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
      >
        Create New Task
      </button>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {currentTasks.map((task) => (
              <li
                key={task.id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">
                  {task.title}{" "}
                  <span
                    className={`${checkStatusColour(
                      task.status_id
                    )} rounded px-4`}
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
                    onClick={() => handleEdit(task.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDetail(task.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <AddTask isOpen={isCreateModalOpened} onClose={handleCloseModal}  />
    </div>
  );
};

export default TasksPage;
