import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./pages/editprofile/EditProfile";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />}>
            <Route path=":id" element={<EditProfile />} />
          </Route>

          <Route index path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
