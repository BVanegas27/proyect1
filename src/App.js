import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import List from "./components/List";
import Detail from "./components/Detail";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route element={<ProtectedRoutes/>}>  
      <Route path="/list" element={<List />} />
      <Route path="/detail/:id" element={<Detail/>}/>
      </Route>
    </Routes> 
  );
}

export default App;
