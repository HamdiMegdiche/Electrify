import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Alert } from "reactstrap";
import api from "../../../api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      visible: true
    };
  }
  connectUser = async event => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(`credentials typed : ${JSON.stringify(credentials)}`);

    try {
      const res = await api.post(`user/login`, credentials);
      if (res.data) {
        console.log("User credentials are correct");
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        this.props.history.push("/dashboard");
      }
    } catch (error) {
      this.setState({ errorMsg: "credentials are incorrect !", visible: true });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMsg: "",
      visible: false
    });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => this.connectUser(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <p className="text-muted">
                        Login: hamdi / Password: test
                      </p>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={this.handleChange}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                        />
                      </InputGroup>
                      {this.state.errorMsg !== "" ? (
                        <Row>
                          <Col>
                            <Alert
                              color="danger"
                              isOpen={this.state.visible}
                              toggle={this.onDismiss}
                            >
                              {this.state.errorMsg}
                            </Alert>
                          </Col>
                        </Row>
                      ) : null}
                      <Row>
                        <Col xs="6">
                          <Button
                            onClick={this.connectUser}
                            color="primary"
                            className="px-4"
                            name="connectButton"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Welcome To Electrify , Please Sign up to make a request
                        for joining the revolution of shared renewable energy.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
