const express = require('express');
const router = express.Router();

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

module.exports = router;
