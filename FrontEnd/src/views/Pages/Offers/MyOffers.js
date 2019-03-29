import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button
} from "reactstrap";

export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.handlerDeleteAll = this.handlerDeleteAll.bind(this);
  }

  handlerDeleteAll = () => {
    this.props.history.push("/offers/make-offer");
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
                    <tr>
                      <th>Offer Id</th>
                      <th>Energy (kwh)</th>
                      <th>Price (Ether)</th>
                      <th>Date Posted</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        0xVasdfasdfasdfasdfkjhfasd
                      </td>
                      <td className="align-middle">300</td>
                      <td className="align-middle">1000</td>
                      <td className="align-middle">2012/01/01</td>
                      <td className="align-middle">
                        <Badge color="success">success</Badge>
                      </td>
                      <td className="align-middle">
                        <Button color="danger" outline>
                          <i className="cui-trash" />
                          &nbsp;Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
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
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
