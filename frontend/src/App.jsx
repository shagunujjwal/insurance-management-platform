import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Agents from "./pages/Agents";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";



function App() {


  return (

    <BrowserRouter>


      <Routes>


        <Route
          path="/"
          element={<Login />}
        />


        <Route
          path="/signup"
          element={<Signup />}
        />



        <Route
          path="/dashboard"
          element={<Dashboard />}
        />



        <Route
          path="/customers"
          element={<Customers />}
        />



        <Route
          path="/agents"
          element={<Agents />}
        />



        <Route
          path="/policies"
          element={<Policies />}
        />



        <Route
          path="/claims"
          element={<Claims />}
        />



        <Route
          path="/payments"
          element={<Payments />}
        />



        <Route
          path="/documents"
          element={<Documents />}
        />



        <Route
          path="/settings"
          element={<Settings />}
        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;