import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge,
  Button
} from "reactstrap";

import Trade from "../../components/Trade";
import { connect } from "react-redux";
import { getTransactions } from "../../../actions/transactionsActions";

class MyTrades extends Component {


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
  toAllTransactions = () => {
    this.props.history.push("/trades");
  }

  render() {
    const { myTransactions,transactions } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <h3>
                There Are &nbsp;
                <Badge color="warning">{myTransactions.length}</Badge> &nbsp; 
                  Transactions
                  <Button
                  onClick={this.toAllTransactions}
                  className="float-right"
                  color="info"
                  outline
                >
                  <i className="fa fa-plus" />
                  &nbsp;All Transactions &nbsp;
                  <Badge color="info">{transactions.length}</Badge> 
                </Button>
                </h3>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive>
                  <thead>
                    {myTransactions.length > 0 ? (
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
                   {myTransactions.map((trans, index) => (
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
  myTransactions: state.trans.myTransactions,
  transactions: state.trans.transactions,
  contract: state.contract.contract,
  web3: state.contract.web3,
  account: state.contract.account,
});

export default connect(
  mapStateToProps,{getTransactions}
)(MyTrades);