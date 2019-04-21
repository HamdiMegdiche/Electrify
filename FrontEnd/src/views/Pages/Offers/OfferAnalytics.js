import React, { Component } from "react";


import { connect } from "react-redux";


class OfferAnalytics extends Component {

  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };
  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  };


  
  componentWillMount() {
    this.props.getOffers();
  }



  render() {

    return (
<div>test</div>
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