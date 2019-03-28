import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Pages/Dashboard/Dashboard"));
const Users = React.lazy(() => import("./views/Pages/Users/Users"));
const User = React.lazy(() => import("./views/Pages/Users/User"));
const Trades = React.lazy(() => import("./views/Pages/Trades/Trades"));
const Offers = React.lazy(() => import("./views/Pages/Offers/Offers"));
const Settings = React.lazy(() => import("./views/Pages/Settings/Settings"));
const Consumption = React.lazy(() =>
  import("./views/Pages/SmartHub/Consumption")
);
const MyEnergy = React.lazy(() => import("./views/Pages/SmartHub/MyEnergy"));
const RealTime = React.lazy(() => import("./views/Pages/SmartHub/RealTime"));
const HouseHold = React.lazy(() => import("./views/Pages/HouseHold/HouseHold"));
const Recommendation = React.lazy(() =>
  import("./views/Pages/Recommendation/Recommendation")
);

const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/trades", exact: true, name: "Trades", component: Trades },
  { path: "/offers", exact: true, name: "Offers", component: Offers },
  { path: "/settings", exact: true, name: "Settings", component: Settings },
  {
    path: "/consumption",
    exact: true,
    name: "Consumption",
    component: Consumption
  },
  { path: "/my-energy", exact: true, name: "My Energy", component: MyEnergy },
  {
    path: "/real-time",
    exact: true,
    name: "Real-Time Energy",
    component: RealTime
  },
  {
    path: "/recommendation",
    exact: true,
    name: "Recommendation",
    component: Recommendation
  },
  {
    path: "/house-hold",
    exact: true,
    name: "House Hold",
    component: HouseHold
  },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User }
];

export default routes;
