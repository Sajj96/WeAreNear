/* eslint-disable no-undef */
const express = require("express");

const hospitalRouter = express.Router();

function routes(con) {
  hospitalRouter.route("/list").post((req, res) => {
    const { regions, districts } = req.body;
    con.query("select * from hospitals where Region = ? and District = ?",[regions, districts],(err, hospitals) => {
        if (err) throw err;
        res.render("hospitalListView", {
          title: "WeAreNear",
          hospitals
        });
      }
    );
  });

  hospitalRouter.route("/search/:keyword").get((req, res) => {
    const {keyword} = req.params;
    con.query(`select * from hospitals where hospital_name like '%${keyword}%'`, (err, hospitals) => {
        if (err) throw err;
        res.render("hospitalListView", {
          title: "WeAreNear",
          hospitals
        });
      }
    );
  });

  return hospitalRouter;
}

module.exports = routes;
