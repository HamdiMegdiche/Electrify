import React, {Component} from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Progress
} from "reactstrap";
import { getOffers,getMyOffers } from "../../../actions/offerActions";
import { getTransactions } from "../../../actions/transactionsActions";
import { Doughnut, Pie } from 'react-chartjs-2';

import {connect} from "react-redux";

const doughnut = {
  labels: [
    'Ether spent',
    'Ether gained',
  ],
  datasets: [
    {
      data: [300, 200],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
    }],
};

const pie = {
  labels: [
    'Local Consumption',
    'Production',
    'Retail Consumption',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

class OfferAnalytics extends Component {

  constructor() {
    super();
    this.state = {
      model: null,
      training: false,
      trained: false,
      predicted: null,
    };
  }


  
  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };

  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  };

  calculateSum = (array) => {
    const avg = array.reduce(
      (sum, a) => {
        return sum + Number(a.unitPrice)
      }, 0) / (array.length || 1);
    return Number(avg).toFixed(3);
  }
  calculateSold = (array) => {
    const avg = array.reduce(
      (sum, a) => {
        return sum + Number(a.quantity)
      }, 0) / (array.length || 1);
      return Number(avg).toFixed(3);

  }


  componentWillMount() {
    this.props.getOffers();
    const {user} = this.props;
    this.props.getMyOffers(user.walletAddress);
    if (this.props.contract) {
      this.props.getTransactions(this.props.contract, this.props.web3, this.props.account);
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contract !== this.props.contract) {
      this.props.getTransactions(nextProps.contract, nextProps.web3, nextProps.account);
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col sm="12" xl="12">
        <Card>
          <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Progress</strong>
                <small> Analytics</small>
          </CardHeader>
          <CardBody>
                <Progress color="success" value={this.calculateSum(this.props.trans.transactions) * 10} className="mb-3">Price of Kwh {this.calculateSum(this.props.trans.transactions)} Ether</Progress>
                <Progress color="info" value={this.props.myTrans.length * 5} className="mb-3">Number of my transactions {this.props.myTrans.length}</Progress>
            <Progress color="warning" value={this.calculateSold(this.props.myTrans) * 30} className="mb-3">sold energy</Progress>
            <Progress color="danger" value={this.calculateSold(this.props.trans.transactions) * 30} className="mb-3">baught energy</Progress>
          </CardBody>
            </Card>
            </Col>
          <Col sm="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                <strong>List Group</strong>
                <small> offers</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    All offers:
                    <Badge className="float-right" pill>
                      {this.props.offers.length}
                    </Badge>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    My Offers:
                    <Badge className="float-right" pill>
                    {this.props.myOffers.length}
                    </Badge>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6" xl="6">
          <Card>
            <CardHeader>
              Energy
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
            </Card>
            </Col>
            <Col sm="6" xl="6">

          <Card>
            <CardHeader>
              Blockchain Transactions
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
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
  myOffers: state.offer.myOffers,
  trans: state.trans,
  myTrans: state.trans.myTransactions,
  user: state.auth.user,
  account: state.contract.account,
  web3: state.contract.web3,
  contract: state.contract.contract,
});

export default connect(mapStateToProps,{getOffers,getMyOffers,getTransactions})(OfferAnalytics);
