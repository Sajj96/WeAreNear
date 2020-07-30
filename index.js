/* eslint-disable no-undef */
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
  console.log(chalk.green("Database is connected"));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "wearenear" }));

app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use("/css", express.static(path.join(__dirname, "/public/plugin/select2")));
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use("/js", express.static(path.join(__dirname, "/public/plugin/select2")));
app.set("views", "./src/views");
app.set("view engine", "ejs");

const districtRouter = require('./src/routes/districtRoutes')(con);
const hospitalRouter = require('./src/routes/hospitalRoutes')(con);

app.use('/district', districtRouter);
app.use('/hospitals', hospitalRouter);
app.get("/", (req, res) => {
  con.query("select * from regions order by SNo ASC", (err, regions) => {
    if (err) throw err;
    con.query("select * from districts order by SNo ASC", (err, districts) => {
      if (err) throw err;
      res.render("index", {
        title: "WeAreNear",
        regions,
        districts
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${chalk.green(port)}`);
});
