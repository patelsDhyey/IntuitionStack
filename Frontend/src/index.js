import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminHome from './AdminHome';
import AdminHeader from './AdminHeader';
import AddLocation from './AddLocation';
import AddCountry from './AddCountry';
import AddDesignations from './AddDesignations';
import AddStatus from './AddStatus';
import EmployeeHeader from './EmployeeHeader';
import PostIntuition from './PostIntuition';
import MyIntuition from './MyIntuition';
import MyIntuition_Update from './MyIntuition_Update';
import Feedback from './Feedback';
import Solution from './Solution';
import PendingForApprovals from './PendingForApprovals';
import ResetPassword from './ResetPassword';
import ApprovedIntuitions from './ApprovedIntuitions';
import IntuitionsImplemented from './IntuitionsImplemented';
import Rewarded from './Rewarded';
import PendingToApprove from './PendingToApprove';
import Connections from './Connections';
import Employees from './Employees';
import MyRejectedSolution from './MyRejectedSolution';
import LostInSpace from './LostInSpace';
import ApprovedIntuitionsByMgr from './ApprovedIntuitionsByMgr';
import ImplementedIntuitionsByMgr from './ImplementedIntuitionsByMgr';
import RejectedSolutionByMrg from './RejectedSolutionByMrg';
import RewardedByMrg from './RewardedByMrg';
import Bio from './Bio';


const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/EmployeeHeader",
    element: <EmployeeHeader />,
  },
  {
    path: "/Employee/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Employee/PostIntuition",
    element: <PostIntuition />,
  },
  {
    path: "/Employee/MyIntuition",
    element: <MyIntuition />,
  },
  {
    path: "/Employee/Connections",
    element: <Connections />,
  },
  {
    path: "/Employee/Connections/Employees",
    element: <Employees />,
  },
  {
    path: "/Employee/MyIntuition/Update",
    element: <MyIntuition_Update />,
  },
  {
    path: "/Employee/Dashboard/Feedback",
    element: <Feedback />,
  },
  {
    path: "/Employee/Dashboard/Solution",
    element: <Solution />,
  },
  {
    path: "/Employee/PendingForApprovals",
    element: <PendingForApprovals />,
  },
  {
    path: "/Employee/MyRejectedSolution",
    element: <MyRejectedSolution />,
  },
  {
    path: "/Employee/IntuitionsImplemented",
    element: <IntuitionsImplemented />,
  },
  {
    path: "/Employee/Rewarded",
    element: <Rewarded />,
  },
  {
    path: "/Employee/Manager/ApprovedIntuitionsByMgr",
    element: <ApprovedIntuitionsByMgr />,
  },
  {
    path: "/Employee/Manager/ImplementedIntuitionsByMgr",
    element: <ImplementedIntuitionsByMgr />,
  },
  {
    path: "/Employee/Manager/RejectedSolutionByMrg",
    element: <RejectedSolutionByMrg />,
  },
  {
    path: "/Employee/Manager/RewardedByMrg",
    element: <RewardedByMrg />,
  },
  {
    path: "/Employee/Authentication/ResetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/Employee/Authentication/Bio",
    element: <Bio />,
  },
  {
    path: "/Employee/ApprovedIntuitions",
    element: <ApprovedIntuitions />,
  },
  {
    path: "/Employee/Manager/PendingToApprove",
    element: <PendingToApprove />,
  },
  {
    path: "/Admin/Home",
    element: <AdminHome />,
  },
  {
    path: "/AdminHeader",
    element: <AdminHeader />,
  },
  {
    path: "/Admin/AddLocation",
    element: <AddLocation />,
  },
  {
    path: "/Admin/AddCountry",
    element: <AddCountry />,
  },
  {
    path: "/Admin/AddDesignations",
    element: <AddDesignations />,
  },
  {
    path: "/Admin/AddStatus",
    element: <AddStatus />,
  },
  {
    path: "*",
    element: <LostInSpace/>,
  }


  // {
  //   path: "/Intuition",
  //   element: <Intuition />,
  // },
  // {
  //   path: "/Intuition/Add",
  //   element: <AddIntuition />,
  // },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
