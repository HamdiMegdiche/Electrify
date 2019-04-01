import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";
import PrivateRoute from "./PrivateRoute";
// import getContract from "./utils/getContract";

const loading = () => <div className="sk-rotating-plane" />;

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404/Page404"),
  loading
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    };
  }

  // async componentDidMount() {
  //   const { contract, web3 } = await getContract();

  //   // console.log(web3.utils.toWei("1", "ether"));

  //   contract.events
  //     .message()
  //     .on("data", event => {
  //       const trans = {
  //         from: event.returnValues[0],
  //         to: event.returnValues[1],
  //         unitPrice: event.returnValues[1],
  //         quantity: event.returnValues[3],
  //         time: new Date(event.returnValues[4] * 1000)
  //       };

  //       console.log(JSON.stringify(trans));
  //     })
  //     .on("error", console.error);
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route path="/404" exact name="Page 404" component={Page404} />

          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
