import api from "../utils/api";

import { Task, TaskPayload } from "../models";
export const taskList = async () => {
  try {
    const res = await api.get("/task/list");
    return res.data;
  } catch (error) {
    console.log("error during fetching the task list", error);
  }
};

export const taskSubmit = async (data: TaskPayload) => {
  try {
    const res = await api.post("/task/create", data);
    return res.data;
  } catch (error) {
    console.log("error during inserting the data", error);
  }
};

export const taskDelete = async (id: number) => {
  try {
    const res = await api.post(`/task/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log("error during deleting thee task", error);
  }
};

export const taskUpdate = async (id: number, newData: TaskPayload) => {
  try {
    const res = await api.post(`/task/update/${id}`, newData);
    return res.data;
  } catch (error) {
    console.log("error during updating the data,", error);
  }
};

export const teamList = async () => {
  try {
    const res = await api.get("/user/team-role");
    return res.data;
  } catch (error) {
    console.log("error during retrieving the user taeam data", error);
  }
};

export const taskDetail = async (id: number) => {
  try {
    const res = await api.get(`/task/detail/${id}`);
    return res.data;
  } catch (error) {
    console.log("error during the displaying the detail", error);
  }
};

export const statusList = async () => {
  try {
    const res = await api.get("/status/list");
    return res.data;
  } catch (error) {
    console.log("error during retrieving list:", error);
  }
};

