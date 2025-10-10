import { Route, Routes } from "react-router-dom";

import { Error } from "../pages/error/error";
import { type ReactNode } from "react";

interface ErrorProps{
  children: ReactNode;
}

export default function ErrorRouter({children}: ErrorProps){
  return(
    <Routes>
      {children}
      <Route path="error-404" element={<Error title="Error 404: page not found" subtitle="Invalid path"/>} />
    </Routes>
  );
}