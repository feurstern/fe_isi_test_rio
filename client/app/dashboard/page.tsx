"use client";

import React, { useEffect, useState } from "react";
import { taskList, taskDelete } from "../services/api";
import { Task, TaskList } from "../models";
import {
  TaskCard,
  Navbar,
  AddTask,
  UpdateTask,
  AddTaskReducer,
} from "../components";
import { useRouter } from "next/navigation";

const TasksPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();

  if (!user || Object.keys(user).length === 0) {
    return router.push("/login");
  }

  const role = user?.user?.role_id;

  // console.log("curreent roel", role);

  const [tasks, setTasks] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
  const [isDetailModalOpened, setIsDetailModalOpened] = useState(false);
  const [selectedTaskData, setSelectedTaskData] = useState<TaskList | null>(
    null
  );
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

  const handleNewData = (newTask: TaskList) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdate = (taskId: number) => {
    const selectedData = tasks.find((x) => x.id == taskId);

    console.log("updatee data", selectedData);
    setSelectedTaskData(selectedData || null);
    setIsUpdateModalOpened(true);
  };

  // console.log("selectedId", selectedId);

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

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpened(false);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpened(false);
  };

  const handleDetail = (taskId: number) => {
    const selectedData = tasks.find((x) => x.id === taskId);
    setIsDetailModalOpened(true);
    console.log("detail data:", selectedData);
  };

  const handleDelete = async (taskId: number) => {
    // console.log(`Delete task with ID: ${taskId}`);
    try {
      const res = await taskDelete(taskId);
      if (res.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        alert("data has been  deleted succesfully!");
      } else {
        alert("error during deleted data");
      }
    } catch (error) {
      alert("error during deleted data");
    }
  };

  const handleUpdateData = (id: number, updatedTask: TaskList) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Task List {isCreateModalOpened}
        </h1>

        {role == 1 ? (
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
          >
            Create New Task
          </button>
        ) : (
          ""
        )}

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks available.</p>
        ) : (
          <div className="py-4">
            <TaskCard
              taskListDataProps={currentTasks}
              onEdit={handleUpdate}
              onDelete={handleDelete}
              onDetail={handleDetail}
              checkStatus={checkStatus}
              checkStatusColour={checkStatusColour}
            />
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

        {/* <AddTask
          onNewTaskProps={handleNewData}
          isOpen={isCreateModalOpened}
          onClose={handleCloseModal}
        /> */}

        <AddTaskReducer
          onNewTaskProps={handleNewData}
          isOpen={isCreateModalOpened}
          onClose={handleCloseModal}
        />

        <UpdateTask
          isOpen={isUpdateModalOpened}
          selectedTaskDataProps={selectedTaskData}
          onClose={handleCloseUpdateModal}
          onUpdateTaskProps={handleUpdateData}
        />
      </div>
    </div>
  );
};

export default TasksPage;
