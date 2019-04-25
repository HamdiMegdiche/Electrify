import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  Row,
  Table,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import Offer from "./../../components/Offer";
import { getMyOffers,deleteAllOffers } from "../../../actions/offerActions";

class MyOffers extends Component {

  async componentDidMount() {
    
    const user = this.props.user;
    this.props.getMyOffers(user.walletAddress);

    // try {
    //     if (this.props.ctr) {
    //       const { contract } = this.props.ctr;
    //     contract.events
    //       .message()
    //       .on("data", async event => {
    //         const trans = {
    //           from: event.returnValues[0],
    //           to: event.returnValues[1]
    //         };

    //         if (
    //           trans.to === user.walletAddress ||
    //           trans.from === user.walletAddress
    //         ) {
    //           this.props.getMyOffers(user.walletAddress);

    //           // eslint-disable-next-line no-restricted-globals
    //           location.reload();

    //           console.log("socket my offers : trnsaction confrimed !");
    //         }
    //       })
    //       .on("error", console.error);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }


  handlerDeleteAll = () => {
    this.props.deleteAllOffers(this.props.user);
  }


  render() {
    const { offers } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="cui-cart" /> My Offers
                <Button
                  onClick={this.handlerDeleteAll}
                  className="float-right"
                  color="danger"
                >
                  &nbsp;Delete All
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                  {offers.length !== 0 ? (
                      <tr>
                        <th>Offer Id</th>
                        <th>Energy (kwh)</th>
                        <th>Price (Ether)</th>
                        <th>Date Posted</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    ) : (
                      <tr>
                        <th>You didn't make any offer yet.</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                  {offers.map((offer, index) => (
                      <Offer key={index} offer={offer} />
                  ))}
                  </tbody>
                </Table>
                <nav>
                  {/* <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button">
                        Prev
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button">
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination> */}
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  offers: state.offer.myOffers,
  loading: state.offer.loading,
  user: state.auth.user,
  ctr: state.contact,
});

export default connect(
  mapStateToProps,
  { getMyOffers,deleteAllOffers }
)(MyOffers)



