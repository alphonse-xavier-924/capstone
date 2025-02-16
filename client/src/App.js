import "./App.css";
import SignupStudent from "./signup/SignupStudent";
import SignupRecruiter from "./signup/SignupRecruiter";
import LoginStudent from "./login/LoginStudent";
import LoginRecruiter from "./login/LoginRecruiter";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./landing/Landing";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/signup/professional",
      element: <SignupStudent />,
    },
    {
      path: "/signup/recruiter",
      element: <SignupRecruiter />,
    },
    {
      path: "/login/professional",
      element: <LoginStudent />,
    },
    {
      path: "/login/recruiter",
      element: <LoginRecruiter />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
