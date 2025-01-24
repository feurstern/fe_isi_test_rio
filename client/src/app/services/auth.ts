import api from "../utils/api";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", { email, password });

    const { token } = res.data;
    localStorage.setItem("token", token);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
