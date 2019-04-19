import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Badge
} from "reactstrap";

import Trade from "../../components/Trade";
import { connect } from "react-redux";
import { getTransactions } from "../../../actions/transactionsActions";
class Trades extends Component {


  componentDidMount() {
    if (this.props.contract) {
      this.props.getTransactions(this.props.contract, this.props.web3, this.props.account);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contract !== this.props.contract) {
      this.props.getTransactions(nextProps.contract, nextProps.web3, nextProps.account);
    }
  }

  toMyTransactions = () => {
    this.props.history.push("/trades/my-trades");
  }
  render() {
    const { transactions,myTransactions } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader> 
                <h3>
                There Are &nbsp;
                <Badge color="warning">{transactions.length}</Badge> &nbsp; 
                  Transactions
                  <Button
                  onClick={this.toMyTransactions}
                  className="float-right"
                  color="info"
                  outline
                >
                  <i className="fa fa-plus" />
                  &nbsp;My Transactions &nbsp;
                  <Badge color="info">{myTransactions.length}</Badge> 
                </Button>
                  </h3>

              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                    {transactions.length > 0 ? (
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Energy (kwh)</th>
                        <th>Price (Ether)</th>
                        <th>Purshase date</th>
                      </tr>
                    ) : (
                      <tr>
                        <th>Loading Transactions</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                   {transactions.map((trans, index) => (
                      <Trade key={index} trans={trans} />
                  ))}
                  </tbody>
                </Table>
                <nav>
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
  transactions: state.trans.transactions,
  myTransactions: state.trans.myTransactions,
  contract: state.contract.contract,
  web3: state.contract.web3,
  account: state.contract.account,

});

export default connect(
  mapStateToProps,{getTransactions}
)(Trades);