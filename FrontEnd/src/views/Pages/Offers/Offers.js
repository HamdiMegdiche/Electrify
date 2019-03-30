import React, { Component } from "react";
import {
  Badge,
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
import { Link } from "react-router-dom";

import api from "../../../api";

export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.handlerMakeOffer = this.handlerMakeOffer.bind(this);
    this.handlerMyOffers = this.handlerMyOffers.bind(this);

    this.state = { offers: [], user: null };
  }

  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };
  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  };

  buyNow = async (e, offer) => {
    e.preventDefault();
    console.log("offer id: " + offer._id);
    console.log("user id: " + this.state.user.id);
  };

  async componentDidMount() {
    try {
      const res = await api.get(`offers/`);
      if (res.data) {
        const offers = res.data;
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({ offers, user });
      } else {
        this.props.history.push("/404");
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="cui-cart" /> Offers
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
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                    {this.state.offers.length > 0 ? (
                      <tr>
                        <th>From</th>
                        <th>Energy (kwh)</th>
                        <th>Price (Ether)</th>
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
                    {this.state.offers.map((value, idx) => {
                      return (
                        <tr key={value._id}>
                          <td className="align-middle">
                            <Link to={`/users/${value.from}`}>
                              {value.from}
                            </Link>
                          </td>
                          <td className="align-middle">
                            {value.quantity / 1000}
                          </td>
                          <td className="align-middle">{value.unitPrice}</td>
                          <td className="align-middle">
                            {new Date(value.createdAt).toLocaleString()}
                          </td>
                          <td className="align-middle">
                            <Badge color="success">{value.status}</Badge>
                          </td>
                          <td className="align-middle">
                            <Button
                              color="danger"
                              onClick={e => this.buyNow(e, value)}
                              outline
                              disabled={this.state.user.id === value.from}
                            >
                              <i className="cui-credit-card" />
                              &nbsp;Buy Now
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
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
