import api from "../utils/api";

export const taskList = async () => {
  try {
    const res = await api.get("/task/list");
    return res.data;
  } catch (error) {
    console.log("error during fetching the task list", error);
  }
};

export const taskDelete = async (id: string) => {
  try {
    const res = await api.post(`/tast/delete/${id}`);

    return res.data;
  } catch (error) {
    console.log("error during deleting thee task", error);
  }
};
