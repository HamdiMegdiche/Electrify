const express = require('express');
const router = express.Router();
const consumption = require('../networkConsumption');
const production = require('../networkProduction');
// const tfModel = require('../tensor');
// const tf = require('@tensorflow/tfjs-node');
// import models
const { Output, OutputDetail } = require('../models');

// http://localhost:4000/api/energy/output/5c9b6c0772cdd62e30853c14/2018-12-31T23:00:00.000Z/2019-01-02T23:00:00.000Z
router.get('/output/:smartHubId/:startDate/:endDate', (req, res) => {
  Output.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: new Date(req.params.startDate),
        $lt: new Date(req.params.endDate)
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      console.log(new Date(req.params.startDate) + ' ' + new Date(req.params.endDate));
      return res.json(outputs);
    }
  );
});

// http://localhost:4000/api/energy/outputDay/5c9b6c0772cdd62e30853c14/2018-12-31T23:00:00.000Z
router.get('/outputDay/:smartHubId/:endDate', (req, res) => {
  let dateStart = new Date(req.params.endDate);
  let dateEnd = new Date(req.params.endDate);
  dateStart.setDate(dateEnd.getDate() - 1);
  Output.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: dateStart,
        $lt: dateEnd
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      return res.json(outputs);
    }
  );
});

// http://localhost:4000/api/energy/outputDetail/5c9b6c0772cdd62e30853c14/2018-12-31T23:00:00.000Z/2019-01-02T23:00:00.000Z
router.get('/outputDetail/:smartHubId/:startDate/:endDate', (req, res) => {
  OutputDetail.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: new Date(req.params.startDate),
        $lt: new Date(req.params.endDate)
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      console.log(new Date(req.params.startDate) + ' ' + new Date(req.params.endDate));
      return res.json(outputs);
    }
  );
});

// http://localhost:4000/api/energy/outputDetailDay/5c9b6c0772cdd62e30853c14/2018-12-31T23:00:00.000Z
router.get('/outputDetailDay/:smartHubId/:endDate', (req, res) => {
  let dateStart = new Date(req.params.endDate);
  let dateEnd = new Date(req.params.endDate);
  dateStart.setDate(dateEnd.getDate() - 1);
  OutputDetail.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: dateStart,
        $lt: dateEnd
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      return res.json(outputs);
    }
  );
});

router.get('/outputNow/:smartHubId', (req, res) => {
  let dateStart = new Date();
  let dateEnd = new Date();
  dateStart.setDate(dateEnd.getDate() - 1);
  Output.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: dateStart,
        $lt: dateEnd
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      return res.json(outputs);
    }
  );
});

router.get('/outputYear/:smartHubId', (req, res) => {
  let dateStart = new Date();
  let dateEnd = new Date();
  let output;
  dateStart.setFullYear(dateEnd.getFullYear() - 1);
  Output.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: dateStart,
        $lt: dateEnd
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      // Because JS doesn't have a nice way to name months because they may differ per locale
      let monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];

      // Use reduce to aggregate your data. Pass around a hash so that we have
      // direct access to groups as well as ensure groups appear just once.
      let dataByMonth = outputs.reduce(function(dataByMonth, datum) {
        let date = new Date(datum.date);
        let value = datum.totalConsumption;
        let month = monthNames[date.getMonth()];
        let year = ('' + date.getFullYear()).slice(-2);
        let group = month + "'" + year;

        dataByMonth[group] = (dataByMonth[group] || 0) + value;

        return dataByMonth;
      }, {});
      console.log(dataByMonth);
      // Now just turn the hash into an array.
      let finalResult = Object.keys(dataByMonth).map(function(group) {
        return { name: group, value: dataByMonth[group] };
      });
      return res.json(finalResult);
    }
  );
});

router.get('/outputDetailNow/:smartHubId', (req, res) => {
  let dateStart = new Date();
  let dateEnd = new Date();
  dateStart.setDate(dateEnd.getDate() - 1);
  OutputDetail.find(
    {
      smartHubId: req.params.smartHubId,
      date: {
        $gt: dateStart,
        $lt: dateEnd
      }
    },
    (err, outputs) => {
      if (err) console.log(err);
      return res.json(outputs);
    }
  );
});

router.get('/forecastConsumption/:date', (req, res) => {
  let dateT = new Date(req.params.date);
  let result = [];
  let data = [];
  for (let i = 0; i < 720; i++) {
    if(i%60===0)
    {
      result.push(
        consumption.neuralNetworkConsumption.forecast([data], 60).map(scaleUpConsumption)
      );
      data = [];
    }
    data.push(
      {
        month: Math.cos((Math.PI * dateT.getMonth()) / 12) ** 2,
        day: Math.cos((Math.PI * dateT.getDate()) / getNumberDays(dateT.getMonth())) ** 2,
        minutes: Math.cos((Math.PI * (dateT.getMinutes() + dateT.getHours() * 60)) / 1440) ** 2
      }
    );
    dateT.setMinutes(dateT.getMinutes() + 1);
  }

  res.json(result);
});

router.get('/forecastProduction/:date', (req, res) => {
  let dateT = new Date(req.params.date);
  let result = [];
  let data = [];
  console.log(production.global.maxProduction + " " + production.global.minProduction + " " + production.global.averageProduction);
  for (let i = 0; i < 720; i++) {
    if(i%60===0)
    {
      result.push(
        production.neuralNetworkProduction.forecast([data], 60).map(scaleUpProduction)
      );
      data = [];
    }
    data.push(
      {
        month: Math.cos((Math.PI * dateT.getMonth()) / 12) ** 2,
        day: Math.cos((Math.PI * dateT.getDate()) / getNumberDays(dateT.getMonth())) ** 2,
        minutes: Math.cos((Math.PI * (dateT.getMinutes() + dateT.getHours() * 60)) / 1440) ** 2
      }
    );
    dateT.setMinutes(dateT.getMinutes() + 1);
  }

  res.json(result);
});

function scaleUpConsumption(step) {
  return {
    month: Math.floor(step.month * 12),
    day: Math.floor(step.day * 31),
    minutes: Math.floor(step.minutes * 10000),
    output:
      step.output * 1000// * (consumption.global.maxConsumption - consumption.global.minConsumption) + consumption.global.averageConsumption
  };
}

function scaleUpProduction(step) {
  return {
    month: step.output,//Math.floor(step.month * 12),
    day: Math.floor(step.day * 31),
    minutes: Math.floor(step.minutes * 10000),
    output:
      step.output * 1000//* (production.global.maxProduction - production.global.minProduction) + production.global.averageProduction
  };
}

function getNumberDays(month) {
  let now = new Date();
  switch ((month + 1) % 2) {
    case 0: {
      if (now.getFullYear() % 4 === 0 && month + 1 === 2) {
        return 29;
      }
      if (now.getFullYear() % 4 !== 0 && month + 1 === 2) {
        return 28;
      }
      return 30;
    }
    case 1: {
      return 31;
    }
    default:
      return 30;
  }
}
module.exports = router;
