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
      smartHubId: ""
    };
  }
  async componentDidMount() {
    try {
      const res = await api.get(`user/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (res.data) {
        let { _id: id, username, email, createdAt ,smartHubId} = res.data;
        createdAt = new Date(createdAt).toLocaleString();
        this.setState({ id, username, email, createdAt ,smartHubId});
      }else{
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
                  User id: {this.props.match.params.id}
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
