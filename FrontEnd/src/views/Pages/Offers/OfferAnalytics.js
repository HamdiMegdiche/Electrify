import React, {Component} from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  Alert
} from "reactstrap";

import {connect} from "react-redux";
import { Train, Model, Dense, Conv2D, MaxPooling2D, Flatten } from 'tfjsx';
import mnist from 'mnist';
import * as tf from '@tensorflow/tfjs';



const data = mnist.set(1500, 100);
const train = data.training;
const test = data.test;

function* mnistTrainDataGenerator() {
  for (let sample of train) {
    yield { x: tf.tensor1d(sample.input).reshape([28, 28, 1]), y: sample.output };
  }
}

function* mnistTestDataGenerator() {
  for (let sample of test) {
    yield { x: tf.tensor1d(sample.input).reshape([28, 28, 1]), y: sample.output };
  }
}


class MnistModel extends React.Component {
  render() {
    return (
      <Train
        trainData={mnistTrainDataGenerator}
        samples={1500}
        validationData={mnistTestDataGenerator}
        onBatchEnd={this.props.onBatchEnd}
        epochs={5}
        batchSize={64}
        onTrainEnd={this.props.onTrainEnd}
        train={this.props.train}
        display
      >     
        <Model
          optimizer={tf.train.sgd(0.15)}
          loss='categoricalCrossentropy'
          metrics={['accuracy']}>
          <Conv2D
            inputShape={[28, 28, 1]}
            kernelSize={5}
            filters={8}
            strides={1}
            activation='relu'
            kernelInitializer='VarianceScaling' />
          <MaxPooling2D poolSize={[2, 2]} strides={[2, 2]} />
          <Conv2D
            kernelSize={5}
            filters={16}
            strides={1}
            activation='relu'
            kernelInitializer='VarianceScaling' />
          <MaxPooling2D poolSize={[2, 2]} strides={[2, 2]} />
          <Flatten />
          <Dense units={10} kernelInitializer='VarianceScaling' activation='softmax' />
          </Model>
          </Train>
    );
  }
}


class OfferAnalytics extends Component {

  constructor() {
    super();
    this.state = {
      model: null,
      training: false,
      trained: false,
      predicted: null,
    };
  }


  
  handlerMakeOffer = () => {
    this.props.history.push("/offers/make-offer");
  };
  handlerMyOffers = () => {
    this.props.history.push("/offers/my-offers");
  };
  componentWillMount() {}
  render() {

    const testDigits = [1,3,4];

//Randomly selects a test digit, ideally this is drawn from the val
  //  set. But it's just random for now.
    const test = tf.stack(testDigits.map(digit => {
      return tf.tensor1d(mnist[digit].get()).reshape([28, 28, 1]);
    }))

   const predict = () => {
      const probTensor = this.state.model.predict(test);
      const probArr = probTensor.dataSync();
      this.setState({
        predicted: testDigits.map((digit, i) => {
          return (
            <Alert className="ml-2 mt-2" color="info" key={i}>
              Sample {i+1} is Offer {digit} with
              {' ' + Math.round(probArr[i * 10 + digit] * 100)}%
              confidence.
            </Alert>
          );
        }),
      });
    }

   // const test = tf.tensor([ 1, 3, 25, 99 ], [4, 1]);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                <strong>List Group</strong>
                <small> tags</small>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    All offers:
                    <Badge className="float-right" pill>
                      {this.props.offers.length}
                    </Badge>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    My Offers:
                    <Badge className="float-right" pill>
                    {this.props.myOffers.length}
                    </Badge>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="12">
          <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                <strong>Best 3 offers</strong>
              </CardHeader>
              <CardBody>
              {this.state.predicted}
              </CardBody>
              </Card>
            </Col>

          <Col sm="12" xl="12">
        <Button className="ml-2" color="secondary" onClick={() => this.setState({ training: !this.state.training })}>
          {this.state.training ? 'Pause Training' : 'Start Training'}
        </Button>
        {this.state.trained && (
              <Button className="ml-2 " color="primary" onClick={predict}>
              Predict
            </Button>
        )}
        <MnistModel
          onTrainEnd={model => this.setState({ model })}
          onBatchEnd={(metrics, model) => this.setState({ model, trained: true })}
          train={this.state.training}/>
          </Col>
        </Row>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  offers: state.offer.offers,
  myOffers: state.offer.myOffers,
  trans: state.offer.transactions,
  myTrans: state.offer.myTransactions,
  user: state.auth.user
});

export default connect(mapStateToProps)(OfferAnalytics);
