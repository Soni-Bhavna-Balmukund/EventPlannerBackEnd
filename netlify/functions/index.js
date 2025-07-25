const express = require('express')
const cors =  require('cors')
const userroutes = require('../../router/userroutes')
const conn = require('../../utility/connectDb')
const businessGroupRoutes = require('../../router/businessGroupRoutes')
const businessCategoryRoutes = require('../../router/businessCategoryRoutes')
const userTypeRoutes = require('../../router/userTypeRoutes')
const countryRoutes = require('../../router/countryRoute')
const locationRoutes =require('../../router/locationRoute')
const stateRoutes = require('../../router/stateRoute')
const areaRoutes = require('../../router/areaRoute')
const addPlaceRoutes = require('../../router/eventPlaceRoute')

const serverless = require('serverless-http')
const router = require('../../router/userroutes')
const routers = express.Router();
const app = express()
app.use(cors())
app.use(express.json())

// app.use('/users',userroutes)

// app.use('/businessgroup',businessGroupRoutes)

// app.use('/businesscategory',businessCategoryRoutes)

// app.use('/usertype',userTypeRoutes)

// app.use('/country',countryRoutes)

// app.use('/locations',locationRoutes)

// app.use('/States',stateRoutes)

routers.use('/Area',areaRoutes)

// app.use('/addPlace',addPlaceRoutes)

// app.get('/netlify/functions/index/',(req,res)=>{
//     res.send('success')
// })

app.get('/index', (req, res) => {
  console.log(error,'dsfjbbdf')
  res.send('success');
});

// const port = 5000;

//     const startServer = async() => {
//         try{
//             await conn()
//             app.listen(port,()=>{
//                 console.log(`server running on port ${port}`)
//             })
//         }
//         catch(error){
//             console.log(error)
//         }
//     }    

// startServer()

app.use('/.netlify/functions/index',routers)
module.exports.handler = serverless(app)