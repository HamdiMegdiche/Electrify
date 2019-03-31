import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import api from "../../../api";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      email: "",
      createdAt: "",
      smartHubId: "",
      walletAddress: ""
    };
  }

  //   async setBalanceState() {
  //     const { web3 } = await getContract();
  //     const { walletAddress } = JSON.parse(localStorage.getItem("user"));
  //     const balance = await web3.eth.getBalance(walletAddress);

  //     console.log(balance);
  //     web3.eth.getBalance("0xB293917D2292C80352F5bF98Fc7AE08E7b6D081D")
  // .then(console.log);
  //     this.setState({ balance });
  //   }

  async componentDidMount() {
    try {
      const res = await api.get(`user/wallet/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (res.data) {
        let {
          _id: id,
          username,
          email,
          createdAt,
          smartHubId,
          walletAddress
        } = res.data;
        createdAt = new Date(createdAt).toLocaleString();

        this.setState({
          id,
          username,
          email,
          createdAt,
          smartHubId,
          walletAddress
        });

      } else {
        this.props.history.push("/404");
      }
    } catch (error) {
      console.log(error);
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  User id: {this.state.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr key="Id">
                      <td>{`ID :`}</td>
                      <td>
                        <strong>{this.state.id}</strong>
                      </td>
                    </tr>
                    <tr key="walet">
                      <td>{`Wallet address :`}</td>
                      <td>
                        <strong>{this.state.walletAddress}</strong>
                      </td>
                    </tr>
                    <tr key="Idsamrthub">
                      <td>{`SmartHub ID :`}</td>
                      <td>
                        <strong>{this.state.smartHubId}</strong>
                      </td>
                    </tr>
                    <tr key="username">
                      <td>{`Username :`}</td>
                      <td>
                        <strong>{this.state.username}</strong>
                      </td>
                    </tr>
                    <tr key="email">
                      <td>{`Email :`}</td>
                      <td>
                        <strong>{this.state.email}</strong>
                      </td>
                    </tr>
                    <tr key="registeredAt">
                      <td>{`Registered At :`}</td>
                      <td>
                        <strong>{this.state.createdAt}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
