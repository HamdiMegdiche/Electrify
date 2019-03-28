import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Users = React.lazy(() => import("./views/Pages/Users/Users"));
const User = React.lazy(() => import("./views/Pages/Users/User"));
const Trades = React.lazy(() => import("./views/Pages/Trades"));
const Offers = React.lazy(() => import("./views/Pages/Offers"));
const Settings = React.lazy(() => import("./views/Pages/Settings"));
const SmartHub = React.lazy(() => import("./views/Pages/SmartHub"));

const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/trades", exact: true, name: "Trades", component: Trades },
  { path: "/offers", exact: true, name: "Offers", component: Offers },
  { path: "/settings", exact: true, name: "Settings", component: Settings },
  { path: "/smart-hub", exact: true, name: "SmartHub", component: SmartHub },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User }
];

export default routes;
