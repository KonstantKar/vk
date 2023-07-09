import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { routesList } from "./routesList";
import useAuth from "../providers/useAuth";

const RoutesComponent: FC = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {routesList.map((route) => {
        if (route.auth && !user) {
          return null;
        }
        return (
          <Route
            path={route.path}
            key={`route${route.path}`}
            element={<route.component />}
          />
        );
      })}
      <Route element={"Error 404"} />
    </Routes>
  );
};

export default RoutesComponent;
