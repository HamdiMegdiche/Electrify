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
import api from "../../../api";

export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.handlerDeleteAll = this.handlerDeleteAll.bind(this);
    this.state = { offers: [] };
  }

  async componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const body = {
        from: user.walletAddress
      };

      const res = await api.post(`offers/`, body);
      if (res.data) {
        const offers = res.data;

        this.setState({ offers });
      } else {
        this.props.history.push("/404");
      }
    } catch (error) {
      console.error(error);
    }
  }

  handlerDeleteOne = async (e, offer, index) => {
    e.preventDefault();
    try {
      await api.delete(`offers/${offer._id}`);

      let offers = this.state.offers;
      offers.splice(index, 1);
      this.setState({ offers });
    } catch (error) {
      console.error(error);
    }
  };
  handlerDeleteAll = async () => {
    try {
      const body = {
        from: JSON.parse(localStorage.getItem("user")).walletAddress
      };

      await api.post(`offers/delete`, body);

      this.setState({ offers: [] });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
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
                    {this.state.offers.length > 0 ? (
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
                    {this.state.offers.map((value, idx) => {
                      return (
                        <tr key={value._id}>
                          <td className="align-middle">{value._id}</td>
                          <td className="align-middle">
                            {value.quantity / 1000}
                          </td>
                          <td className="align-middle">{value.unitPrice}</td>
                          <td className="align-middle">
                            {new Date(value.createdAt).toLocaleString()}
                          </td>
                          <td>
                            {value.status === "Pending" ? (
                              <Badge color="success">{value.status}</Badge>
                            ) : (
                              <Badge color="danger">{value.status}</Badge>
                            )}
                          </td>

                          <td className="align-middle">
                            <Button
                              color="danger"
                              outline
                              onClick={e =>
                                this.handlerDeleteOne(e, value, idx)
                              }
                            >
                              <i className="cui-trash" />
                              &nbsp;Delete
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
