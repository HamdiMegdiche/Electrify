import React, { Component } from "react";
import { Line } from "react-chartjs-2";
// import Battery from "../../components/Battery";
import api from "../../../api";
import { CLIENT_RENEG_LIMIT } from "tls";
import axios from "axios";

import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");
const brandInfo = getStyle("--info");

let myData;
// var elements = 1440;
var myProduction = [];
var myConsumption = [];
var myBattery = [];
var myLabels = [];

// Main Chart

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      production: 0,
      consumption: 0,
      battery: 0,
      cardChartData1: {},
      cardChartOpts1: {},
      cardChartData2: {},
      cardChartOpts2: {},
      cardChartData3: {},
      cardChartOpts3: {},
      cardChartDataweather: {},
      cardChartOptsweather: {},
      consumption_rasp: -1,
      temperature: -1,
      humidity: -1
    };
  }

  async componentWillMount() {
    this.interval = setInterval(() => this.updateChart(), 60000);
    this.interval = setInterval(() => this.updateWeather(), 5000);

    myProduction = [];
    myConsumption = [];
    myBattery = [];
    myLabels = [];
    try {
      const res = await api
        .get(`energy/outputNow/5c9b6c0772cdd62e30853c16`)
        .then(_ => {
          myData = _.data;
          for (var i = 0; i <= myData.length - 1; i = i + 10) {
            myProduction.push(myData[i].totalProduction);
            myConsumption.push(myData[i].totalConsumption);
            myBattery.push(myData[i].batteryLevel);
            let date = new Date(myData[i].date);
            myLabels.push(date.getHours() + ":" + date.getMinutes());
          }
          // UPDATE CHARTS

          // Card Chart 1
          this.state.cardChartData1 = {
            labels: myLabels,
            datasets: [
              {
                label: "Consumption",
                backgroundColor: brandPrimary,
                borderColor: "rgba(255,255,255,.55)",
                data: myConsumption
              }
            ]
          };

          this.state.cardChartOpts1 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "transparent",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: "transparent"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min:
                      Math.min.apply(
                        Math,
                        this.state.cardChartData1.datasets[0].data
                      ) - 5,
                    max:
                      Math.max.apply(
                        Math,
                        this.state.cardChartData1.datasets[0].data
                      ) + 5
                  }
                }
              ]
            },
            elements: {
              line: {
                borderWidth: 1
              },
              point: {
                radius: 0,
                hitRadius: 2,
                hoverRadius: 4
              }
            }
          };

          // Card Chart 2
          this.state.cardChartData2 = {
            labels: myLabels,
            datasets: [
              {
                label: "Production",
                backgroundColor: brandInfo,
                borderColor: "rgba(255,255,255,.55)",
                data: myProduction
              }
            ]
          };

          this.state.cardChartOpts2 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "transparent",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: "transparent"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min:
                      Math.min.apply(
                        Math,
                        this.state.cardChartData2.datasets[0].data
                      ) - 5,
                    max:
                      Math.max.apply(
                        Math,
                        this.state.cardChartData2.datasets[0].data
                      ) + 50
                  }
                }
              ]
            },
            elements: {
              line: {
                tension: 0.00001,
                borderWidth: 1
              },
              point: {
                radius: 0,
                hitRadius: 2,
                hoverRadius: 4
              }
            }
          };

          // Card Chart 3
          this.state.cardChartData3 = {
            labels: myLabels,
            datasets: [
              {
                label: "Battery Level",
                backgroundColor: "rgba(255,255,255,.2)",
                borderColor: "rgba(255,255,255,.55)",
                data: myBattery
              }
            ]
          };

          this.state.cardChartOpts3 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: false
                }
              ],
              yAxes: [
                {
                  display: false
                }
              ]
            },
            elements: {
              line: {
                borderWidth: 2
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          };

          // UPDATE CHARTS
          // Change states
          let calculate = data => data.reduce((a, b) => a + b, 0);
          this.state.production = (calculate(myProduction) / 100).toFixed(3);
          this.state.consumption = (calculate(myConsumption) / 100).toFixed(3);
          this.state.battery = (myBattery[myBattery.length - 1] / 100).toFixed(
            3
          );
          // Change states
        });
      if (res.data) {
        console.log("Got data!");
        console.log(res.data);
      }
    } catch (error) {
      this.setState({ errorMsg: "Error !", visible: true });
    }

    // ---------------------------- weather skander--------------------------
    console.log("Get initial weather data ");

    axios
      .get(`http://172.20.10.2:5000`)
      .then(resWeather => {
        console.log("Get inital data done");
        console.log(resWeather.data);
        const resjson = JSON.parse(resWeather.data);
        const { humidity, temperature } = resWeather.data;
        this.setState({ humidity, temperature });
      })
      .catch(error => {
        console.log("Catch from getting initial data (not connected) 1245");
        // console.log(error);
        this.setState({
          humidity: 1254,
          temperature: 1254,
          consumption_rasp: 1254
        });
        this.interval = setInterval(() => this.updateWeather(), 2000);
      });
  }

  updateWeather() {
    console.log("Get data updated each 5 s changing to 555555");
    this.setState({
      temperature: 555555,
      humidity: 555555,
      consumption_rasp: 555555
    });

    const myTemp = [];
    const myHumidity = [];
    let resWeather = [];
    try {
      resWeather = axios.get(`http://172.20.10.2:5000`);
      if (resWeather.data) {
        console.log(resWeather.data.humidity);

        const { humidity, temperature } = resWeather.data;
        this.setState({ humidity, temperature });
      }
    } catch (error) {
      console.log(
        "not connected (catch from updater weather) changing to -10000"
      );
      // console.log(error);
      this.setState({
        temperature: -10000,
        humidity: -10000,
        consumption_rasp: -10000
      });
    }
  }

  async updateChart() {
    myProduction = [];
    myConsumption = [];
    myBattery = [];
    myLabels = [];
    try {
      const res = await api
        .get(`energy/outputNow/5c9b6c0772cdd62e30853c16`)
        .then(_ => {
          myData = _.data;
          for (var i = 0; i <= myData.length - 1; i = i + 10) {
            myProduction.push(myData[i].totalProduction);
            myConsumption.push(myData[i].totalConsumption);
            myBattery.push(myData[i].batteryLevel);
            let date = new Date(myData[i].date);
            myLabels.push(date.getHours() + ":" + date.getMinutes());
          }
          // UPDATE CHARTS

          // Card Chart 1
          this.state.cardChartData1 = {
            labels: myLabels,
            datasets: [
              {
                label: "Consumption",
                backgroundColor: brandPrimary,
                borderColor: "rgba(255,255,255,.55)",
                data: myConsumption
              }
            ]
          };

          this.state.cardChartOpts1 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "transparent",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: "transparent"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min:
                      Math.min.apply(
                        Math,
                        this.state.cardChartData1.datasets[0].data
                      ) - 5,
                    max:
                      Math.max.apply(
                        Math,
                        this.state.cardChartData1.datasets[0].data
                      ) + 5
                  }
                }
              ]
            },
            elements: {
              line: {
                borderWidth: 1
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          };

          // Card Chart 2
          this.state.cardChartData2 = {
            labels: myLabels,
            datasets: [
              {
                label: "Production",
                backgroundColor: brandInfo,
                borderColor: "rgba(255,255,255,.55)",
                data: myProduction
              }
            ]
          };

          this.state.cardChartOpts2 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "transparent",
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    fontSize: 2,
                    fontColor: "transparent"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: false,
                    min:
                      Math.min.apply(
                        Math,
                        this.state.cardChartData2.datasets[0].data
                      ) - 5,
                    max:
                      Math.max.apply(
                        Math,
                        this.state.cardChartData2.datasets[0].data
                      ) + 50
                  }
                }
              ]
            },
            elements: {
              line: {
                tension: 0.00001,
                borderWidth: 1
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          };

          // Card Chart 3
          this.state.cardChartData3 = {
            labels: myLabels,
            datasets: [
              {
                label: "Battery Level",
                backgroundColor: "rgba(255,255,255,.2)",
                borderColor: "rgba(255,255,255,.55)",
                data: myBattery
              }
            ]
          };

          this.state.cardChartOpts3 = {
            tooltips: {
              enabled: false,
              custom: CustomTooltips
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: false
                }
              ],
              yAxes: [
                {
                  display: false
                }
              ]
            },
            elements: {
              line: {
                borderWidth: 2
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          };

          // UPDATE CHARTS
          // Change states
          let calculate = data => data.reduce((a, b) => a + b, 0);
          this.state.production = (calculate(myProduction) / 100).toFixed(3);
          this.state.consumption = (calculate(myConsumption) / 100).toFixed(3);
          this.state.battery = (myBattery[myBattery.length - 1] / 100).toFixed(
            3
          );
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
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card1"
                    isOpen={this.state.card1}
                    toggle={() => {
                      this.setState({ card1: !this.state.card1 });
                    }}
                  >
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="fa fa-flash fa-lg mt-4" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem disabled>Disabled action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">{this.state.consumption}</div>
                <div>Energy Consumption</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={this.state.cardChartData1}
                  options={this.state.cardChartOpts1}
                  height={70}
                  redraw={true}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card1"
                    isOpen={this.state.card2}
                    toggle={() => {
                      this.setState({ card2: !this.state.card2 });
                    }}
                  >
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="fa fa-line-chart fa-lg mt-4" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem disabled>Disabled action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">{this.state.production}</div>
                <div>Energy Production</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={this.state.cardChartData2}
                  options={this.state.cardChartOpts2}
                  height={70}
                  redraw={true}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown
                    id="card3"
                    isOpen={this.state.card3}
                    toggle={() => {
                      this.setState({ card3: !this.state.card3 });
                    }}
                  >
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="fa fa-circle-o-notch fa-lg fa-spin mt-4" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">{this.state.battery}</div>
                <div>Battery Level</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: "70px" }}>
                <Line
                  data={this.state.cardChartData3}
                  options={this.state.cardChartOpts3}
                  height={70}
                  redraw={true}
                />
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            {/* <Battery /> */}
          </Col>
        </Row>

        {/* temperature humidity  consumption_rasp */}
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card style={{ maxHeight: 100 }} className="text-white bg-primary">
              <CardBody className="pb-0 card-body">
                <div className="text-value weather">
                  <h3>{this.state.temperature}°C</h3>
                  <h2>Temperature</h2>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card style={{ maxHeight: 100 }} className="text-white bg-primary">
              <CardBody className="pb-0 card-body">
                <div className="text-value weather">
                  <h3>{this.state.humidity}%</h3>
                  <h2>Humidity</h2>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card style={{ maxHeight: 100 }} className="text-white bg-primary">
              <CardBody className="pb-0 card-body">
                <div className="text-value weather">
                  <h3>{this.state.consumption_rasp}Watt</h3>
                  <h2>Consumption</h2>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
