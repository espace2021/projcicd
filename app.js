const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const path = require('path'); // Ajout de l'importation de path
const client = require('prom-client');
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

//cette route est pour tester l'application mais à enlever avec le build react ajouté
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

// Création d'un registre de métriques
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Exemple de compteur personnalisé
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestCounter);

// Middleware pour compter les requêtes
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

// la route /metrics est utilisée pour exposer les métriques
// Assurez-vous que le registre est correctement configuré
// et que les métriques sont collectées avant d'être exposées.
// Route d'exposition des métriques
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

//serveur écoute
app.listen(process.env.PORT)
console.log("application executée sur le port " + process.env.PORT)
module.exports = app;