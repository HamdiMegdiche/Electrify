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

export default class MyTrades extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [], user: null };
  }

  async componentDidMount() {
    const ether = 1000000000000000000;

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const { contract } = await getContract();

      const nbrTrans = await contract.methods.transCount().call();

      const transactions = [];

      for (let i = 0; i < nbrTrans; i++) {
        const tr = await contract.methods.transactions(i).call();

        const trans = {
          from: tr[0],
          to: tr[1],
          unitPrice: tr[2]/ ether,
          quantity: tr[3] / 1000,
          date: new Date(tr[4]*1000).toLocaleString()
        };
        if(trans.from === user.walletAddress)
          transactions.push(trans);
      }

      this.setState({ transactions, user });
    } catch (error) {
      console.error(error);
    }
  }

  toAllTransactions(){
     // eslint-disable-next-line no-restricted-globals
     location.href = "/trades";
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="cui-cart" /> All My transactions made on the blockchain
                <Button
                  onClick={this.toAllTransactions}
                  className="float-right ml-2 mr-2"
                  color="info"
                  outline
                >
                  <i className="fa fa-plus" />
                  &nbsp;All Transactions
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                    {this.state.transactions.length > 0 ? (
                      <tr>
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
                        <tr key={idx}>
                          <td className="align-middle">
                            <Link to={`/users/${value.to}`}>{value.to}</Link>
                          </td>
                          <td className="align-middle">{value.quantity}</td>
                          <td className="align-middle">{value.unitPrice}</td>
                          <td className="align-middle">{value.date}</td>
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
