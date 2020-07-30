/* eslint-disable no-undef */
const express = require("express");

const districtRouter = express.Router();

function routes(con) {
  districtRouter.route("/:Region").get((req, res) => {
    const region = req.params.Region;
    con.query("select * from districts where Region = ?", [region], (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  });

  return districtRouter;
}

module.exports = routes;
