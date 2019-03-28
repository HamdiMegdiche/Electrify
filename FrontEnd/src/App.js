import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";
//import getContract from "./utils/getContract";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Calculating Energy...</div>
);

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

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500/Page500"),
  loading
});

class App extends Component {
  // componentDidMount = async () => {
  //   const { contract, web3 } = await getContract();
  //   const accounts = await web3.eth.getAccounts();

  //   console.log("This is a copy of the deployed smartcontract :");
  //   console.log(contract);

  //   console.log(`\nThis is the list of accounts imported
  //   (the same deployed network specified in truffle-config) : `);
  //   console.log(accounts);

  //   const owner = await contract.methods.owner().call();

  //   console.log(`\nThis is the owner address' of the deployed smartcontract
  //   (should be the first account address in ganache) :`);
  //   console.log(owner);

  //   // try {
  //   //   var response = await contract.methods
  //   //     .makeTransaction({
  //   //       to: "0xD588f5e397C4385ddB3549aA6066493d8183bCcD",
  //   //       quantity: 3000
  //   //     })
  //   //     .call({ from: web3.eth.accounts[0], value: 100000000000 })
  //   //     ;
  //   //   console.log(response);
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }

  //   this.setState({
  //     accounts,
  //     contract,
  //     web3,
  //     owner
  //   });
  // };

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
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
