import React, { Component } from "react";
import { Line, Radar, Bar } from "react-chartjs-2";
import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import api from "../../../api";
import { connect } from "react-redux";

let myData;
var myConsumption = [];
var myLabels = [];

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

// const bar = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgba(255,99,132,0.2)",
//       borderColor: "rgba(255,99,132,1)",
//       borderWidth: 1,
//       hoverBackgroundColor: "rgba(255,99,132,0.4)",
//       hoverBorderColor: "rgba(255,99,132,1)",
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

 class SmartHub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineChart: {},
      radarChart: {},
      barChart: {}
    };
  }

  async componentWillMount() {
    try {
      // console.log(JSON.parse(localStorage.getItem("user")).userName);
      const res = await api
        .get(
          `energy/outputDetailNow/` +
            this.props.user.smartHubId
        )
        .then(_ => {
          myData = _.data;
          var result = [];
          myData.reduce(function(res, value) {
            if (!res[value.applianceName]) {
              res[value.applianceName] = {
                applianceName: value.applianceName,
                Consumption: 0
              };
              result.push(res[value.applianceName]);
            }
            res[value.applianceName].Consumption += value.Consumption;
            return res;
          }, {});

          const uniqueLabels = [
            ...new Set(myData.map(item => item.applianceName))
          ];
          const uniqueValues = [
            ...new Set(myData.map(item => item.Consumption))
          ];
          myConsumption.push(uniqueValues);
          myLabels.push(uniqueLabels);
          // console.log(myConsumption[0]);
          this.state.radarChart = {
            labels: myLabels[0],
            datasets: [
              {
                label: "Appliances",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: myConsumption[0]
              }
            ]
          };
          this.state.lineChart = {
            labels: myLabels[0],
            datasets: [
              {
                label: "Appliances",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: myConsumption[0]
              }
            ]
          };
          // BAR
          try {
             api
              .get(
                `energy/outputYear/` +
                  this.props.user.smartHubId
              )
              .then(_ => {
                myData = _.data;

                const uniqueLabels = [
                  ...new Set(myData.map(item => item.name))
                ];
                const uniqueValues = [
                  ...new Set(myData.map(item => (item.value / 1000).toFixed(3)))
                ];
                const barChart = {
                  labels: uniqueLabels,
                  datasets: [
                    {
                      label: "Consumption per month",
                      backgroundColor: "rgba(255,99,132,0.2)",
                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                      hoverBackgroundColor: "rgba(255,99,132,0.4)",
                      hoverBorderColor: "rgba(255,99,132,1)",
                      data: uniqueValues
                    }
                  ]
                };
                this.setState({ barChart });
              });
          } catch (error) {
            this.setState({ errorMsg: "Error !", visible: true });
          }
          // BAR
        });
      if (res.data) {
        console.log("Got data!");
        console.log(res.data);
      }
    } catch (error) {
      this.setState({ errorMsg: "Error !", visible: true });
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>Appliance use</CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line
                  data={this.state.lineChart}
                  options={options}
                  redraw={true}
                />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Appliance consumption</CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Radar data={this.state.radarChart} redraw={true} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
        <Card>
            <CardHeader>
              Total Consumption per month
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={this.state.barChart} options={options} />
              </div>
            </CardBody>
          </Card>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.auth.user,

});

export default connect(
  mapStateToProps
)(SmartHub);
