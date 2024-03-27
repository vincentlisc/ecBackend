const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5500;
const cookieParser = require('cookie-parser');
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // This is the location of the React app you're trying to connect from
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // These are the allowed http methods
    allowedHeaders: [
      "Accept",
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ], // These are the allowed headers
    credentials: true,
  })
);

app.use(require("./routes/RestaurantRoutes"));
// app.use(require("./routes/DinerRoutes"));
app.use(require("./routes/UserRoutes"));
app.use(require("./routes/ReservationRoutes"));
// app.use(require('./routes/Reservation'))
app.use(require("./Auth/login"));

// const { login } = require("./Auth/login");
// app.use("/auth", login);
// get driver connection
const dbo = require("./db/conn");

// app.get('/restaurants/:id', async (req,res)=>{
//   const {id} = req.params.id;

// })
// const corsOptions = {
//     origin: '*', // This should match the origin of your frontend app or use '*' for all origins (less secure).
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     optionsSuccessStatus: 200// This is important if your frontend needs to send cookies or use credentials with requests.
//     // Adjust based on the methods your API supports.
// };

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//    res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use("/", (req, res) => {
  res.send("home page");
});

app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
