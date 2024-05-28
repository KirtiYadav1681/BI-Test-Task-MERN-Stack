const express = require('express');
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', require('./routes/AuthRoute'));
app.use('/group', require('./routes/GroupRoute'));
app.use('/expense',require('./routes/ExpenseRoutes'));

app.listen(process.env.PORT || 8888,()=>{
    console.log(`Server running successfully on ${process.env.PORT || 8888}`);
})