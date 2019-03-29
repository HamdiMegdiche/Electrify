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

export default class OfferForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

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
                          0xlkjahsdlkajshdsdalskjdh
                        </p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Ether</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            id="input3-group1"
                            name="input3-group1"
                            placeholder=".."
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>.00</InputGroupText>
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
                            type="text"
                            id="input3-group1"
                            name="input3-group1"
                            placeholder=".."
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Kwh</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Deliver Method</Label>
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="inline-radio1"
                            name="inline-radios"
                            value="option1"
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="inline-radio1"
                          >
                            Slow
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="inline-radio2"
                            name="inline-radios"
                            value="option2"
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="inline-radio2"
                          >
                            Average
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="inline-radio3"
                            name="inline-radios"
                            value="option3"
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="inline-radio3"
                          >
                            Fast
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup>
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
                        onClick={this.handlerMakeOffer}
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
