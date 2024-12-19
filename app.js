require("dotenv").config();
const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const clc = require("cli-color");
const responseHandler = require("./src/helpers/responseHandler");
const {
  swaggerUi,
  swaggerSpec,
  swaggerOptions,
} = require("./src/swagger/swagger");
const adminRoute = require("./src/routes/admin");
const userRoute = require("./src/routes/user");
const brandRoute = require("./src/routes/brand");
const categoryRoute = require("./src/routes/category");
const couponRoute = require("./src/routes/coupon");
const discountRoute = require("./src/routes/discount");
const tierRoute = require("./src/routes/tier");
const transactionRoute = require("./src/routes/transaction");
const pointCriteriaRoute = require("./src/routes/pointCriteria");
const referralRoute = require("./src/routes/referral");


//! Create an instance of the Express application
const app = express();

//* Define the PORT & API version based on environment variable
const { PORT, API_VERSION, NODE_ENV } = process.env;
//* Use volleyball for request logging
app.use(volleyball);
//* Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());
//* Parse JSON request bodies
app.use(express.json());
//* Set the base path for API routes
const BASE_PATH = `/api/${API_VERSION}`;
//* Import database connection module
require("./src/helpers/connection");

//? Define a route for the API root
app.get(BASE_PATH, (req, res) => {
  return responseHandler(
    res,
    200,
    "🛡️ Welcome! All endpoints are fortified. Do you possess the master 🗝️?"
  );
});

//* Swagger setup
app.use(
  `${BASE_PATH}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

//* Configure routes for user API
app.use(`${BASE_PATH}/admin`, adminRoute);
app.use(`${BASE_PATH}/user`,userRoute);
app.use(`${BASE_PATH}/brand`,brandRoute)
app.use(`${BASE_PATH}/category`,categoryRoute)
app.use(`${BASE_PATH}/coupon`,couponRoute)
app.use(`${BASE_PATH}/discount`,discountRoute)
app.use(`${BASE_PATH}/point-criteria`,pointCriteriaRoute)
app.use(`${BASE_PATH}/referral`,referralRoute)
app.use(`${BASE_PATH}/tier`,tierRoute)
app.use(`${BASE_PATH}/transaction`,transactionRoute)


app.listen(PORT, () => {
  const portMessage = clc.redBright(`✓ App is running on port: ${PORT}`);
  const envMessage = clc.yellowBright(
    `✓ Environment: ${NODE_ENV || "development"}`
  );
  console.log(`${portMessage}\n${envMessage}`);
});
