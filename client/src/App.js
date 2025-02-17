import "./App.css";
import SignupStudent from "./signup/SignupStudent";
import SignupRecruiter from "./signup/SignupRecruiter";
import LoginStudent from "./login/LoginStudent";
import LoginRecruiter from "./login/LoginRecruiter";
import StudentProfile from "./profile/StudentProfile";
import CompanyProfile from "./profile/CompanyProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./landing/Landing";
import Navbar from "./navigation/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup/professional" element={<SignupStudent />} />
          <Route path="/signup/recruiter" element={<SignupRecruiter />} />
          <Route path="/login/professional" element={<LoginStudent />} />
          <Route path="/login/recruiter" element={<LoginRecruiter />} />
          <Route path="/professional/profile" element={<StudentProfile />} />
          <Route path="/recruiter/profile" element={<CompanyProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
