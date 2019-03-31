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
import getContract from "../../../utils/getContract";


export default class Trades extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [], user: null };
  }

  async componentDidMount() {
    try {
      const res = "";
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({ transactions: [], user });
        const { contract, web3 } = await getContract();

        contract.events.message({ fromBlock: 0, toBlock: "latest" }, (error, event) => { console.log(event); })
        .on('data', (event) => {
            console.log(event); // same results as the optional callback above
        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error);

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
                <i className="cui-cart" /> Trades
                <Button
                  onClick={this.handlerMyOffers}
                  className="float-right ml-2 mr-2"
                  color="info"
                  outline
                >
                  <i className="fa fa-plus" />
                  &nbsp;My Transactions
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                    {this.state.transactions.length > 0 ? (
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Energy (kwh)</th>
                        <th>Price (Ether)</th>
                        <th>Purshase date</th>
                      </tr>
                    ) : (
                      <tr>
                        <th>There are no transactions yet.</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {this.state.transactions.map((value, idx) => {
                      return (
                        <tr key={value._id}>
                          <td className="align-middle">
                            <Link to={`/users/${value.from}`}>
                              {value.from}
                            </Link>
                          </td>
                          <td className="align-middle">
                            <Link to={`/users/${value.to}`}>
                              {value.to}
                            </Link>
                          </td>
                          <td className="align-middle">
                            {value.quantity / 1000}
                          </td>
                          <td className="align-middle">{value.unitPrice}</td>
                          <td className="align-middle">
                            {new Date(value.createdAt).toLocaleString()}
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
