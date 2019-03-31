import React, { Component } from "react";
import etherLogo from "../../../assets/ether.jpeg";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import api from "../../../api";
import { Alert } from "reactstrap";
import getContract from "../../../utils/getContract";

export default class OfferForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      errorMsg: "",
      visible: false,
      quantity: 2000,
      unitPrice: 1,
      total: 2,
      account: ""
    };
  }

  onDismiss = () => {
    this.setState({ visible: false });
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  async componentDidMount() {
    try {
      const { web3 } = await getContract();
      const [account] = await web3.eth.getAccounts();
      this.setState({ account });
    } catch (error) {
      this.setState({
        errorMsg:
          "Please make sure that you are connected to your wallet MetaMask",
        visible: true
      });
    }
  }

  handleChange = event => {
    let total = 0;
    if (
      event.target.value > 0 &&
      this.state.unitPrice > 0 &&
      event.target.name === "quantity"
    )
      total = (event.target.value / 1000) * this.state.unitPrice;
    else if (
      this.state.quantity > 0 &&
      event.target.value > 0 &&
      event.target.name === "unitPrice"
    )
      total = (this.state.quantity / 1000) * event.target.value;

    this.setState({
      [event.target.name]: event.target.value,
      errorMsg: "",
      total,
      visible: false
    });
  };

  handlerMakeOffer = async e => {
    e.preventDefault();

    if (this.state.unitPrice <= 0 || isNaN(this.state.unitPrice))
      return this.setState({
        errorMsg: "kWh price must be a number greater than 0",
        visible: true
      });

    if (
      this.state.quantity <= 0 ||
      isNaN(this.state.quantity) ||
      this.state.quantity.toString(10).includes(".", 0) ||
      this.state.quantity.toString(10).includes(",", 0)
    )
      return this.setState({
        errorMsg: "Quantity must be an integer greater than 0",
        visible: true
      });
    if (this.state.account.length <= 0)
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    try {
      let body = {
        from: JSON.parse(localStorage.getItem("user")).id,
        unitPrice: this.state.unitPrice,
        quantity: this.state.quantity,
        walletAddress: this.state.account
      };

      const res = await api.post(`offers/create`, JSON.stringify(body));
      if (res.data) {
        let { _id: id, username, email, createdAt } = res.data;
        createdAt = new Date(createdAt).toLocaleString();

        this.setState({ id, username, email, createdAt });
        this.props.history.push("/offers/my-offers");
      } else {
        this.props.history.push("/404");
      }
    } catch (error) {
      console.error(error);
      this.setState({ errorMsg: "Error while saving offer", visible: true });
    }
  };

  handlerCancelMakeOffer = e => {
    e.preventDefault();
    this.setState({ quantity: 0, total: 0, unitPrice: 0, visible: false });
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <small> Make </small>
                <strong>Offer</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="6">
                    <FormGroup row>
                      <Col md="3">
                        <Label>UserId</Label>
                      </Col>
                      <Col md="9">
                        <p className="form-control-static">
                          {JSON.parse(localStorage.getItem("user")).id}
                        </p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>kWh price</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="number"
                            id="input3-group1"
                            name="unitPrice"
                            placeholder=".."
                            required
                            value={this.state.unitPrice}
                            onChange={this.handleChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Ether</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Energy</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="number"
                            pattern="[0-9]*"
                            id="input3-group1"
                            name="quantity"
                            placeholder=".."
                            required
                            value={this.state.quantity}
                            onChange={this.handleChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Wh</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Total</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            id="input3-group1"
                            name="input3-group1"
                            value={this.state.total}
                            disabled
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Ether</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Alert
                        color="danger"
                        isOpen={this.state.visible}
                        toggle={this.onDismiss}
                      >
                        {this.state.errorMsg}
                      </Alert>
                      <Button
                        onClick={e => this.handlerMakeOffer(e)}
                        className="float-left"
                        color="success"
                        outline
                      >
                        <i className="fa fa-plus" />
                        &nbsp;Accept
                      </Button>
                      <Button
                        onClick={e => this.handlerCancelMakeOffer(e)}
                        className="ml-2"
                        color="danger"
                        outline
                      >
                        <i className="fa fa-plus" />
                        &nbsp;Cancel
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <img src={etherLogo} alt="ether logo" className="mw-100" />
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
