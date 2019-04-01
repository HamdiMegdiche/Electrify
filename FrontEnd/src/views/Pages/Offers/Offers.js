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
import getContract from "../../../utils/getContract";

export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.handlerMakeOffer = this.handlerMakeOffer.bind(this);
    this.handlerMyOffers = this.handlerMyOffers.bind(this);

    this.state = { offers: [], user: null, contract: null, web3: null };
  }

  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };
  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  };

  buyNow = async (e, offer) => {
    e.preventDefault();
    const ether = 1000000000000000000;

    let completed = false;
    try {
      await this.state.contract.methods
        .makeTransaction(offer.from, offer.quantity)
        .send({
          value: (offer.quantity / 1000) * offer.unitPrice * ether
        });

      completed = true;
    } catch (err) {
      completed = true;
      console.log("error in making offer !");
    }

    if (completed) {
      console.log("success transaction : confirm now");
      await api.post(`offers/confirm/${offer._id}`);
      await this.updateOffersState();
    }
  };

  async updateOffersState() {
    try {
      const res = await api.get(`offers/`);
      if (res.data) {
        this.setState({ offers: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidMount() {
    try {
      const { contract, web3 } = await getContract();
      const [account] = await web3.eth.getAccounts();
      const user = JSON.parse(localStorage.getItem("user"));

      web3.eth.defaultAccount = account;
      this.setState({ user, contract, web3 });

      await this.updateOffersState();

      contract.events
        .message()
        .on("data", async event => {
          let time = new Date(event.returnValues[4] * 1000).toLocaleString();

          const trans = {
            from: event.returnValues[0],
            to: event.returnValues[1],
            unitPrice: event.returnValues[1],
            quantity: event.returnValues[3],
            time
          };

          if (
            trans.to === user.walletAddress ||
            trans.from === user.walletAddress
          ) {
            await this.updateOffersState();

            console.log("socket : trnsaction confrimed !");
          }
        })
        .on("error", console.error);
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
                    {this.state.offers.map((value, idx) => {
                      return (
                        <tr key={value._id}>
                          <td className="align-middle">
                            <Link to={`/users/${value.from}`}>
                              {value.from.substr(0, 30) + "..."}
                            </Link>
                          </td>
                          <td className="align-middle">
                            {value.quantity / 1000}
                          </td>
                          <td className="align-middle">
                            {(value.quantity / 1000) * value.unitPrice}
                          </td>
                          <td className="align-middle">
                            {new Date(value.createdAt).toLocaleString()}
                          </td>
                          <td className="align-middle">
                            {value.status === "Pending" ? (
                              <Badge color="success">{value.status}</Badge>
                            ) : (
                              <Badge color="danger">{value.status}</Badge>
                            )}
                          </td>
                          <td className="align-middle">
                            <Button
                              color="danger"
                              onClick={e => this.buyNow(e, value)}
                              outline
                              disabled={
                                this.state.user.walletAddress === value.from ||
                                value.status === "Passed"
                              }
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
