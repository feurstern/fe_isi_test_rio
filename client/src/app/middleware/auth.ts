import { NextPageContext } from "next";
import jwtDecode from "jwt-decode";

export const requiredAuth = (c: NextPageContext) => {
  const token =
    c.req?.headers.cookie?.split("token=")[1] || localStorage.getItem("token");

  if (!token) {
    c.res?.writeHead(302, { location: "/login" }).end();
    return null
  }


  return token;

  //   try {
  //     return

  //   } catch (err) {

  //   }
};
