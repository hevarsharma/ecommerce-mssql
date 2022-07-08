const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const dbConnection = require('./utils/dbConnection')
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

dotenv.config({ path: './config.env' });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: true}));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/api",require("./routes/userRouter"));
app.use("/api",require("./routes/productRouter"));

const multerUse = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')

app.use(multerUse);

app.get("/", (req, res) => {
  res.send(`Hello from the server`);
});

dbConnection().then(status => {
    console.log(status)
    app.listen(process.env.PORT || 3000, () => {
        console.log(`App listening at http://localhost:${process.env.PORT || 3000}`)
    })
}).catch(err => console.log(err))