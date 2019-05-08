import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import {
  Button,
  // ButtonGroup,
  // ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Progress,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import api from "../../../api";
import { connect } from "react-redux";

const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandDanger = getStyle("--danger");

// Main Chart
let myData;
// var elements = 1440;
var myProduction = [];
var myConsumption = [];
var myBattery = [];
var myLabels = [];
var lost = [];
var grid = [];
var max1 = 0;
var max2 = 0;
var max3 = 0;
var maxValue = 0;

export default class RealTime extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      mainChart: {},
      mainChartOpts: {},
      production: 0,
      consumption: 0,
      ratio: 0,
      lostEnergy: 0,
      energyFromGrid: 0,
      lostEnergyPerc: 0,
      gridPerc: 0,
      date: new Date()
    };
  }

  async updateChart() {
    myProduction = [];
    myConsumption = [];
    myBattery = [];
    myLabels = [];
    lost = [];
    grid = [];
    max1 = 0;
    max2 = 0;
    max3 = 0;
    maxValue = 0;
    try {
      const res = await api
        .get(
          `energy/outputNow/` +
          this.props.user.smartHubId
          )
        .then(_ => {
          myData = _.data;
          for (var i = 0; i <= myData.length - 1; i++) {
            // console.log(myData[i]);
            myProduction.push(myData[i].totalProduction);
            myConsumption.push(myData[i].totalConsumption);
            myBattery.push(myData[i].batteryLevel);
            let date = new Date(myData[i].date);
            myLabels.push(date.getHours() + ":" + date.getMinutes());
            lost.push(myData[i].lostEnergy);
            grid.push(myData[i].energyFromGrid);
          }
          max1 = Math.max(...myProduction);
          max2 = Math.max(...myConsumption);
          max3 = Math.max(...myBattery);
          maxValue = Math.max(...[max1, max2, max3]);

          this.state.mainChart = {
            labels: myLabels,
            datasets: [
              {
                label: "Production",
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: myProduction
              },
              {
                label: "Consumption",
                backgroundColor: "transparent",
                borderColor: brandSuccess,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: myConsumption
              },
              {
                label: "Battery",
                backgroundColor: "transparent",
                borderColor: brandDanger,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 1,
                borderDash: [8, 5],
                data: myBattery
              }
            ]
          };
          this.state.mainChartOpts = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips,
              intersect: true,
              mode: "index",
              position: "nearest",
              callbacks: {
                labelColor: function(tooltipItem, chart) {
                  return {
                    backgroundColor:
                      chart.data.datasets[tooltipItem.datasetIndex].borderColor
                  };
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(maxValue / 5),
                    max: maxValue
                  }
                }
              ]
            },
            elements: {
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3
              }
            }
          };
          // Change states
          let calculate = data => data.reduce((a, b) => a + b, 0);
          this.state.production = (calculate(myProduction) / 100).toFixed(3);
          this.state.consumption = (calculate(myConsumption) / 100).toFixed(3);
          if (this.state.production > this.state.consumption) {
            this.state.ratio = (
              (this.state.consumption / this.state.production) *
              100
            ).toFixed(2);
          } else {
            this.state.ratio = (
              (this.state.production / this.state.consumption) *
              100
            ).toFixed(2);
          }
          this.state.lostEnergy = (calculate(lost) / 100 / 2).toFixed(3);
          this.state.energyFromGrid = (calculate(grid) / 100).toFixed(3);
          this.state.lostEnergyPerc = (
            (this.state.lostEnergy / this.state.production) *
            100
          ).toFixed(2);
          this.state.gridPerc = (
            (this.state.energyFromGrid / this.state.consumption) *
            100
          ).toFixed(2);
          this.state.date = new Date();
          // Change states
        });
      if (res.data) {
        console.log("Got data!");
        console.log(res.data);
      }
    } catch (error) {
      this.setState({ errorMsg: "Error !", visible: true });
    }
  }

  async componentWillMount() {
    this.interval = setInterval(() => this.updateChart(), 60000);
    try {
      const res = await api
        .get(
          `energy/outputNow/` +
          this.props.user.smartHubId
          )
        .then(_ => {
          myData = _.data;
          for (var i = 0; i <= myData.length - 1; i++) {
            // console.log(myData[i]);
            myProduction.push(myData[i].totalProduction);
            myConsumption.push(myData[i].totalConsumption);
            myBattery.push(myData[i].batteryLevel);
            let date = new Date(myData[i].date);
            myLabels.push(date.getHours() + ":" + date.getMinutes());
            lost.push(myData[i].lostEnergy);
            grid.push(myData[i].energyFromGrid);
          }
          max1 = Math.max(...myProduction);
          max2 = Math.max(...myConsumption);
          max3 = Math.max(...myBattery);
          maxValue = Math.max(...[max1, max2, max3]);

          this.state.mainChart = {
            labels: myLabels,
            datasets: [
              {
                label: "Production",
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: myProduction
              },
              {
                label: "Consumption",
                backgroundColor: "transparent",
                borderColor: brandSuccess,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 2,
                data: myConsumption
              },
              {
                label: "Battery",
                backgroundColor: "transparent",
                borderColor: brandDanger,
                pointHoverBackgroundColor: "#fff",
                borderWidth: 1,
                borderDash: [8, 5],
                data: myBattery
              }
            ]
          };
          this.state.mainChartOpts = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips,
              intersect: true,
              mode: "index",
              position: "nearest",
              callbacks: {
                labelColor: function(tooltipItem, chart) {
                  return {
                    backgroundColor:
                      chart.data.datasets[tooltipItem.datasetIndex].borderColor
                  };
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(maxValue / 5),
                    max: maxValue
                  }
                }
              ]
            },
            elements: {
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3
              }
            }
          };
          // Change states
          let calculate = data => data.reduce((a, b) => a + b, 0);
          this.state.production = (calculate(myProduction) / 100).toFixed(3);
          this.state.consumption = (calculate(myConsumption) / 100).toFixed(3);
          if (this.state.production > this.state.consumption) {
            this.state.ratio = (
              (this.state.consumption / this.state.production) *
              100
            ).toFixed(2);
          } else {
            this.state.ratio = (
              (this.state.production / this.state.consumption) *
              100
            ).toFixed(2);
          }
          this.state.lostEnergy = (calculate(lost) / 100 / 2).toFixed(3);
          this.state.energyFromGrid = (calculate(grid) / 100).toFixed(3);
          this.state.lostEnergyPerc = (
            (this.state.lostEnergy / this.state.production) *
            100
          ).toFixed(2);
          this.state.gridPerc = (
            (this.state.energyFromGrid / this.state.consumption) *
            100
          ).toFixed(2);
          this.state.date = new Date();
          // Change states
        });
      if (res.data) {
        console.log("Got data!");
        console.log(res.data);
      }
    } catch (error) {
      this.setState({ errorMsg: "Error !", visible: true });
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      Calculating Energy...
    </div>
  );

  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">Real-Time Energy</CardTitle>
                  <div className="small text-muted">
                    {this.state.date.toLocaleTimeString()}
                  </div>
                </Col>
                <Col sm="7" className="d-none d-sm-inline-block">
                  <Button color="primary" className="float-right">
                    <i className="icon-cloud-download" />
                  </Button>
                </Col>
              </Row>
              <div
                className="chart-wrapper"
                style={{ height: 300 + "px", marginTop: 40 + "px" }}
              >
                <Line
                  data={this.state.mainChart}
                  options={this.state.mainChartOpts}
                  height={300}
                  redraw={true}
                />
              </div>
            </CardBody>
            <CardFooter>
              <Row className="text-center">
                <Col sm={12} md className="mb-sm-2 mb-0">
                  <div className="text-muted">Consumption</div>
                  <strong>{this.state.consumption} Watts </strong>
                  <Progress
                    className="progress-xs mt-2"
                    color="primary"
                    value="40"
                  />
                </Col>
                <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                  <div className="text-muted">Production</div>
                  <strong> {this.state.production} Watts </strong>
                  <Progress
                    className="progress-xs mt-2"
                    color="info"
                    value="20"
                  />
                </Col>
                <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                  <div className="text-muted"> Ratio</div>
                  <strong> {this.state.ratio}%</strong>
                  <Progress
                    className="progress-xs mt-2"
                    color="success"
                    value={this.state.ratio}
                  />
                </Col>

                <Col sm={12} md className="mb-sm-2 mb-0">
                  <div className="text-muted">Lost Energy</div>
                  <strong>
                    {" "}
                    {this.state.lostEnergy} Watts ({this.state.lostEnergyPerc}%)
                  </strong>
                  <Progress
                    className="progress-xs mt-2"
                    color="danger"
                    value={this.state.lostEnergyPerc}
                  />
                </Col>
                <Col sm={12} md className="mb-sm-2 mb-0">
                  <div className="text-muted">Grid Energy</div>
                  <strong>
                    {this.state.energyFromGrid} Watts ({this.state.gridPerc}%)
                  </strong>
                  <Progress
                    className="progress-xs mt-2"
                    color="warning"
                    value={this.state.gridPerc}
                  />
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = state => ({
  user: state.auth.user,

});

export default connect(
  mapStateToProps
)(SmartHub);
