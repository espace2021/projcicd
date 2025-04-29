const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const path = require('path'); // Ajout de l'importation de path

const app = express();

app.use(cors({
    origin:'*'
}))

//middleware
app.use(express.json())

//routes
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter=require('./routes/scategorie.route')
const articleRouter=require('./routes/article.route')
//const userRouter = require( "./routes/user.route.js")
const paymentRouter =require("./routes/payment.route.js");
const locationRouter =require("./routes/location.route.js");

dotenv.config()

/*
app.get("/",(req,res)=>{
    res.send("page accueil")
})
*/

// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD)
    .then(() => {console.log("Connexion à la base de données réussie");
   }).catch(err => {
    console.log('Impossible de se connecter à la base de données', err);
    process.exit();
   });

//appel routes
app.use("/api/categories",categorieRouter)
app.use("/api/scategories",scategorieRouter)
app.use("/api/articles",articleRouter)
//app.use('/api/users', userRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/locations', locationRouter);

//dist reactjs
app.use(express.static(path.join(__dirname, './client/build'))); // Route pour les pages non trouvées, redirige vers index.html 
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, './client/build/index.html')); });

//serveur
app.listen(process.env.PORT)
console.log("application executée sur le port " + process.env.PORT)
module.exports = app;