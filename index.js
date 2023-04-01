const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

var cors = require('cors');
app.use(cors());

app.get("/", (req,res)=> {
    res.json({
        message: "Welcome"
    });
});

require("./routes/mssqlroutes.js")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function (){
    console.log(`Server is running on port : ${PORT}.`)
});
