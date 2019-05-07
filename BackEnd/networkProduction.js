const brain = require('brain.js');
const { Output } = require('./models');
const config = {
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 4
};
const configTrained = require('./trained');
const fs = require('fs');
// create a simple feed forward neural network with backpropagation
const neuralNetworkProduction = new brain.recurrent.LSTMTimeStep(config);
let global = {
   maxProduction : 0,
   minProduction : 0,
   averageProduction : 0,
}

let dateStart = new Date('2019-01-01T00:00:00.000Z');
let dateEnd = new Date('2019-01-15T00:00:00.000Z');
let trainingData = [];
let trainingInput = [];

// NeuralNetwork.fromJSON(configTrained);
try {
  Output.find(
    {
      smartHubId: '5c9b6c0772cdd62e30853c16',
      date: {
        $gt: dateStart,
        $lt: dateEnd
      }
    },
    { date: 1, totalProduction: 1, _id: 0, smartHubId: 1 },
    (err, outputs) => {
      if (err) console.log(err);

      return outputs;
    }
  )
    .then(_ => {
      for (let i = 0; i <= _.length - 1; i++) {
        //
        let objectDate = new Date(_[i].date);
        let object = {
          month: objectDate.getMonth(),
          day: objectDate.getDate(),
          minutes: objectDate.getMinutes() + objectDate.getHours() * 60,
          output: _[i].totalProduction
        };
        trainingInput.push(scaleDown(object));
      }
      global.maxProduction = Math.max(...trainingInput.map(o => o.output), 0);
      global.minProduction = Math.min(...trainingInput.map(o => o.output), 0);
      global.averageProduction = getAverage(trainingInput);
      // trainingInput.forEach(_ => {
      //   _.output = (_.output - global.averageProduction) / (global.maxProduction - global.minProduction);
      //   if (_.output > 0) {
      //     _.output = 0;
      //   }
      // });
      for (let i = 0; i < trainingInput.length; i += 60) {
        trainingData.push(trainingInput.slice(i, i + 60));
      }
      console.log('Production data imported!' + trainingData.length);
      neuralNetworkProduction.train(trainingData, {
        log: stats => console.log(stats),
        learningRate: 0.005,
        logPeriod: 100,
        errorThresh: 0.05
      });
      console.log('Production brain trained!');
      console.log(scaleUp(neuralNetworkProduction.run(trainingData[1])));
      console.log(neuralNetworkProduction.forecast(trainingData[1], 10).map(scaleUp));
      let fileContent = neuralNetworkProduction.toJSON();
      // console.log(fileContent);
      fs.writeFile('./neuralNetworkProduction.json', JSON.stringify(fileContent), err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File has been created');
      });
    })
    .catch(err => console.log(err));
} catch (err) {
  console.error(err);
}
// NeuralNetwork.fromJSON(configTrained);

function scaleDown(step) {
  return {
    month: Math.cos((Math.PI * step.month) / 12) ** 2,
    day: Math.cos((Math.PI * step.day) / getNumberDays(step.month)) ** 2,
    minutes: Math.cos((Math.PI * step.minutes) / 1440) ** 2,
    output: step.output / 1000
  };
}

function scaleUp(step) {
  return {
    month: Math.acos(step.month) / (Math.PI * 12),
    day: Math.acos(step.month) / (Math.PI * getNumberDays(Math.acos(step.month) / (Math.PI * 12))),
    minutes: Math.acos(step.minutes) / (Math.PI * 1440),
    output: step.output * 1000// * (global.maxProduction - global.minProduction) + global.averageProduction
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
function getAverage(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i].output;
  }
  return sum / numbers.length;
}



module.exports = { neuralNetworkProduction, global };
