import React, { Component } from "react";
import etherLogo from "../../../assets/ether.jpeg";
import { addOffer } from "../../../actions/offerActions";
import { connect } from "react-redux";

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
  Row,
  Alert
} from "reactstrap";

class OfferForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      message: "",
      visible: false,
      quantity: 2000,
      unitPrice: 1,
      total: 2
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
      message: "",
      total,
      visible: false
    });
  };



  handlerMakeOffer = e => {

    if (this.state.unitPrice <= 0 || isNaN(this.state.unitPrice))
      return this.setState({
        message: "kWh price must be a number greater than 0",
        visible: true
      });

    if (
      this.state.quantity <= 0 ||
      isNaN(this.state.quantity) ||
      this.state.quantity.toString(10).includes(".", 0) ||
      this.state.quantity.toString(10).includes(",", 0)
    )
      return this.setState({
        message: "Quantity must be an integer greater than 0",
        visible: true
      });

    const user = this.props.auth.user;
    if (user.walletAddress.length <= 0)
      return this.setState({
        message:
          "Please verify that you are connected to your MetaMask wallet",
        visible: true
      });

      const newOffer = {
        from: user.walletAddress,
        unitPrice: this.state.unitPrice,
        quantity: this.state.quantity
      };

    this.props.addOffer(newOffer);
    this.props.history.push("/my-offers");
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        message: nextProps.errors.message,
        visible: nextProps.errors.visible 
      });
    }
  }

  handlerCancelMakeOffer = e => {
    e.preventDefault();
    this.setState({ quantity: 0, total: 0, unitPrice: 0, visible: false });
  };

  render() {
    const {user} = this.props.auth
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
                          {user.id}
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
                        {this.state.message}
                      </Alert>
                      <Button
                        onClick={this.handlerMakeOffer}
                        className="float-left"
                        color="success"
                        outline
                      >
                        <i className="fa fa-plus" />
                        &nbsp;Accept
                      </Button>
                      <Button
                        onClick={this.handlerCancelMakeOffer}
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


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { addOffer }
)(OfferForm);