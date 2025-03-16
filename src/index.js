const express = require("express");
const sequelize = require("./database/index");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

require('dotenv').config();
/**
 * Configuraciones, y CORS
 */
path.basename(__dirname);
const app = express();
app.set("PORT", process.env.PORT);
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("key", process.env.CLAVE);
app.set("public", path.join(__dirname, "public"));
app.use("/static", express.static(app.get("public")));
console.log(app.get("public"));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index.ejs')
})

//middlewares 
app.use('/auth', require('./app/Auth/ruta'));
app.use('/horarios', require('./app/horarios/ruta'));

app.listen(app.get("PORT"), () => {
    sequelize
        .authenticate()
        .then(() => {
	console.log(`AdminJS started on http://localhost:${process.env.PORT}`)
            console.log("se conecto con exito!!");
        })
        .catch((err) => {
            console.log(err);
        });
    console.log("listen to port " + app.get("PORT"));
});
