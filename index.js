/* eslint-disable no-undef */
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('req-flash');

const app = express();
const port = process.env.PORT || 3001;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wearenear",
});

con.connect(function (err) {
  if (err) throw err;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ 
  secret: "wearenearyouson",
  resave: true,
  saveUninitialized: true
 }));
app.use(flash());

app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use("/css", express.static(path.join(__dirname, "/public/plugin/select2")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/public/plugin/DataTables"))
);
app.use("/css", express.static(path.join(__dirname, "/public/plugin")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/propellerkit/dist/css"))
);
app.use(
  "/css",
  express.static(
    path.join(__dirname, "/node_modules/propellerkit-datetimepicker/css")
  )
);
app.use(
  "/css",
  express.static(path.join(__dirname, "/public/plugin/DateTimePicker"))
);
app.use(
  "/css",
  express.static(path.join(__dirname, "/public/plugin/NotificationStyles/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/js/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/moment/min"))
);
app.use("/js", express.static(path.join(__dirname, "/public/plugin/select2")));
app.use(
  "/js",
  express.static(path.join(__dirname, "/public/plugin/DataTables"))
);
app.use("/js", express.static(path.join(__dirname, "/public/plugin")));
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/propellerkit/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/public/plugin/DateTimePicker"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/public/plugin/jquery-ui-1.12.1"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/public/plugin/NotificationStyles/js"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

const districtRouter = require("./src/routes/districtRoutes")(con);
const appointmentRouter = require("./src/routes/appointmentRoutes")(con);

app.use("/district", districtRouter);
app.use("/appointment", appointmentRouter);
app.get("/hospitals", (req, res) => {
  con.query("select * from hospitals order by hospital_name ASC", (err, hospitals) => {
    if (err) throw err;
    res.render("hospitalListView", {
      title: "WeAreNear",
      hospitals
    });
  });
});
app.get("/", (req, res) => {
  con.query("select * from regions order by SNo ASC", (err, regions) => {
    if (err) throw err;
    con.query("select * from districts order by SNo ASC", (err, districts) => {
      if (err) throw err;
      res.render("index", {
        title: "WeAreNear",
        regions,
        districts,       
        success: req.flash('success'),
        error: req.flash('error')
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${chalk.green(port)}`);
});
