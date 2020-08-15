/* eslint-disable no-global-assign */
/* eslint-disable no-undef */
const express = require("express");

const appointmentRouter = express.Router();

function routes(con) {
  appointmentRouter.route("/create").post((req, res) => {
    const { regions, districts } = req.body;
    con.query("select * from hospitals where Region = ? and District = ?",[regions, districts],(err, hosp) => {
        if (err) throw err;
        res.render("createAppointment", {
          title: "WeAreNear",
          hosp
        });
      }
    );
  });

  return appointmentRouter;
}

module.exports = routes;
