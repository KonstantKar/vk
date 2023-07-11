import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const useAuth = () => {
  // Данный хук нужен чтобы не экспортировать каждый раз useContext и доставать нужный элемент через useAuth()
  const value = useContext(AuthContext);
  return value;
};

export default useAuth;
