import api from "../utils/api";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", { email, password });

    const { token } = res.data;
    const user = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return res.data;
  } catch (error) {
    console.log("error during logout");
  }
};
