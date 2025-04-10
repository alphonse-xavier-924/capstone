// import "./App.css";
// import SignupStudent from "./signup/SignupStudent";
// import SignupRecruiter from "./signup/SignupRecruiter";
// import LoginStudent from "./login/LoginStudent";
// import LoginRecruiter from "./login/LoginRecruiter";
// import StudentProfile from "./profile/StudentProfile";
// import CompanyProfile from "./profile/CompanyProfile";
// import Jobposting from "./jobposting/Jobposting";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Landing from "./landing/Landing";
// import Navbar from "./navigation/Navbar";
// import ForgotPassword from "./login/ForgotPassword";
// import ResetPassword from "./login/ResetPassword";
// import Home from "./home/Home";
// import { AuthProvider } from "./AuthContext";
// import PrivateRoute from "./PrivateRoute";
// import Joblist from "./joblist/Joblist";
// import Applications from "./applications/Applications";
// import PastJobs from "./pastjobs/PastJobs";
// import ViewApplications from "./viewapplications/ViewApplications";

// function App() {
//   const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"));
//   console.log("isLoggedIn:", isLoggedIn);
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route
//               path="/home"
//               element={
//                 <PrivateRoute>
//                   <Home />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/signup/professional" element={<SignupStudent />} />
//             <Route path="/signup/recruiter" element={<SignupRecruiter />} />
//             <Route
//               path="/login/professional"
//               element={isLoggedIn ? <Navigate to="/home" /> : <LoginStudent />}
//             />
//             <Route path="/login/recruiter" element={<LoginRecruiter />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password/:token" element={<ResetPassword />} />
//             <Route
//               path="/professional/profile"
//               element={
//                 <PrivateRoute>
//                   <StudentProfile />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/professional/jobs"
//               element={
//                 <PrivateRoute>
//                   <Joblist />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/professional/applications"
//               element={
//                 <PrivateRoute>
//                   <Applications />
//                 </PrivateRoute>
//               }
//             />

//             <Route
//               path="/recruiter/profile"
//               element={
//                 <PrivateRoute>
//                   <CompanyProfile />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/recruiter/jobposting"
//               element={
//                 <PrivateRoute>
//                   <Jobposting />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/recruiter/pastjobs"
//               element={
//                 <PrivateRoute>
//                   <PastJobs />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/applications/:jobId"
//               element={
//                 <PrivateRoute>
//                   <ViewApplications />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import "./App.css";
import SignupStudent from "./signup/SignupStudent";
import SignupRecruiter from "./signup/SignupRecruiter";
import LoginStudent from "./login/LoginStudent";
import LoginRecruiter from "./login/LoginRecruiter";
import StudentProfile from "./profile/StudentProfile";
import CompanyProfile from "./profile/CompanyProfile";
import Jobposting from "./jobposting/Jobposting";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import Landing from "./landing/Landing";
import Navbar from "./navigation/Navbar";
import ForgotPassword from "./login/ForgotPassword";
import ResetPassword from "./login/ResetPassword";
import Home from "./home/Home";
import { AuthProvider } from "./AuthContext";
import Joblist from "./joblist/Joblist";
import Applications from "./applications/Applications";
import PastJobs from "./pastjobs/PastJobs";
import ViewApplications from "./viewapplications/ViewApplications";

/** Function to persist the last visited route */
function PersistRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("lastVisitedPath", location.pathname);
  }, [location]);

  useEffect(() => {
    const savedPath = localStorage.getItem("lastVisitedPath");
    if (savedPath && savedPath !== "/") {
      navigate(savedPath, { replace: true });
    }
  }, []);

  return null;
}

/** Private Route to protect authenticated pages */
const PrivateRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("keepLoggedIn"));
  return isAuthenticated ? <Outlet /> : <Navigate to="/login/professional" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <PersistRoute />
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                JSON.parse(localStorage.getItem("keepLoggedIn")) ? (
                  <Navigate to="/home" />
                ) : (
                  <Landing />
                )
              }
            />
            <Route path="/signup/professional" element={<SignupStudent />} />
            <Route path="/signup/recruiter" element={<SignupRecruiter />} />
            <Route path="/login/professional" element={<LoginStudent />} />
            <Route path="/login/recruiter" element={<LoginRecruiter />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Private Routes for authenticated users */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/professional/profile"
                element={<StudentProfile />}
              />
              <Route path="/professional/jobs" element={<Joblist />} />
              <Route
                path="/professional/applications"
                element={<Applications />}
              />
              <Route path="/recruiter/profile" element={<CompanyProfile />} />
              <Route path="/recruiter/jobposting" element={<Jobposting />} />
              <Route path="/recruiter/pastjobs" element={<PastJobs />} />
              <Route
                path="/applications/:jobId"
                element={<ViewApplications />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
