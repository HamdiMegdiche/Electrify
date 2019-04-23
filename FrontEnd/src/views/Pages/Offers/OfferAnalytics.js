import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';


import { connect } from "react-redux";


class OfferAnalytics extends Component {
  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };
  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  }; 
  componentWillMount() {
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List Group</strong>
                <small> tags</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">All offers:<Badge className="float-right" pill>14</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">My Offers:<Badge className="float-right" pill>2</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Current Kwh price: <Badge className="float-right" pill color="warning">1</Badge></ListGroupItem>
                </ListGroup>
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
  loading: state.offer.loading,
});

export default connect(
  mapStateToProps,
)(OfferAnalytics);