import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  FormGroup,
  Form,
  InputGroupAddon,
  Input,
  InputGroup
} from "reactstrap";

import { connect } from "react-redux";
import Offer from "./../../components/Offer";
import { getOffers,searchOffers } from "../../../actions/offerActions";

class Offers extends Component {

  state={
    minimum : "",
    maximum : ""
  }

  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };
  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  };

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

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'minimum') {
      this.props.searchOffers(event.target.value,this.state.maximum);
    } else {
      this.props.searchOffers(this.state.minimum,event.target.value);
    }
  }

  
  componentWillMount() {
    this.props.getOffers();
  }

  render() {
    const { offers } = this.props;

    
    const offersList = (
        this.props.offers.map((offer, index) => (
          <Offer key={index} offer={offer} />
        )));
    const searchList = (
      this.props.search.map((offer, index) => (
        <Offer key={index} offer={offer} />
      )));


    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Form action="" method="post" className="form-horizontal">
                <FormGroup row>
                    <Col md="4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" color="primary"> Minimum:</Button>
                        </InputGroupAddon>
                        <Input min="0" onChange={this.onChange} value={this.state.minimum} type="number" id="input1-group2" name="minimum" placeholder="Insert Number" />
                      </InputGroup>
                    </Col>
                    <Col md="4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" color="primary">Maximum:</Button>
                        </InputGroupAddon>
                        <Input min="0" onChange={this.onChange} value={this.state.maximum} type="number" id="input1-group2" name="maximum" placeholder="Insert Number" />
                      </InputGroup>
                    </Col>

                <Button
                  onClick={this.handlerMakeOffer}
                  className="float-right"
                  color="success"
                  outline
                >
                  <i className="fa fa-plus" />
                  &nbsp;Make Offer
                </Button>
                <Button
                  onClick={this.handlerMyOffers}
                  className="float-right ml-2 mr-2"
                  color="info"
                  outline
                >
                  <i className="fa fa-plus" />
                  &nbsp;My Offers
                </Button>
                </FormGroup>
                </Form>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                    { offers.length !== 0 ? (
                      <tr>
                        <th>From</th>
                        <th>Energy (kwh)</th>
                        <th>Total Price (Ether)</th>
                        <th>Date Posted</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    ) : (
                      <tr>
                        <th>There are no offers yet.</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                      {this.props.searching ? searchList : offersList}
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

const mapStateToProps = state => ({
  offers: state.offer.offers,
  searching: state.offer.searching,
  search: state.offer.search,
  loading: state.offer.loading,
});

export default connect(
  mapStateToProps,
  { getOffers,searchOffers }
)(Offers);