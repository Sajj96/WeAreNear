/* eslint-disable no-global-assign */
/* eslint-disable no-undef */
const express = require("express");
const { MongoClient } = require("mongodb");

const appointmentRouter = express.Router();

function routes(con) {
  appointmentRouter.route("/create").post((req, res) => {
    const { regions, districts } = req.body;
    con.query(
      "select * from hospitals where Region = ? and District = ?",
      [regions, districts],
      (err, hosp) => {
        if (err) throw err;
        res.render("createAppointment", {
          title: "WeAreNear",
          hosp,
        });
      }
    );
  });

  appointmentRouter.route("/save").post((req, res) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      dbirth,
      mbirth,
      ybirth,
      appointment_date,
      hospital,
      insurance,
      provider,
      reason,
    } = req.body;
    const url = "mongodb://localhost:27017";
    const dbName = "wearenear";
    let dob = ybirth + "-" + mbirth + "-" + dbirth;

    (async function createAppointment() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        const db = client.db(dbName);

        const col = db.collection("appointments");
        const appoint = {
          firstname,
          lastname,
          email,
          phone,
          gender,
          dob,
          appointment_date,
          hospital,
          insurance,
          provider,
          reason,
        };
        await col.insertOne(appoint);
        req.flash("success", "Appointment booked successfully!");
        res.redirect("/");
      } catch (error) {
        req.flash("error", "Something went wrong while booking appointment!");
        console.log(error.stack);
      }
    })();
  });

  return appointmentRouter;
}

module.exports = routes;
