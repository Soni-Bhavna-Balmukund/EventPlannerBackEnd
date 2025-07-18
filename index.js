const express = require('express')
const cors =  require('cors')
const userroutes = require('./router/userroutes')
const conn = require('./utility/connectDb')
const businessGroupRoutes = require('./router/businessGroupRoutes')
const businessCategoryRoutes = require('./router/businessCategoryRoutes')
const userTypeRoutes = require('./router/userTypeRoutes')
const countryRoutes = require('./router/countryRoute')
const locationRoutes =require('./router/locationRoute')
const stateRoutes = require('./router/stateRoute')
const areaRoutes = require('./router/areaRoute')
const addPlaceRoutes = require('./router/eventPlaceRoute')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users',userroutes)

app.use('/businessgroup',businessGroupRoutes)

app.use('/businesscategory',businessCategoryRoutes)

app.use('/usertype',userTypeRoutes)

app.use('/country',countryRoutes)

app.use('/locations',locationRoutes)

app.use('/States',stateRoutes)

app.use('/Area',areaRoutes)

app.use('/addPlace',addPlaceRoutes)

const port = 5000;

    const startServer = async() => {
        try{
            await conn()
            app.listen(port,()=>{
                console.log(`server running on port ${port}`)
            })
        }
        catch(error){
            console.log(error)
        }
    }    

startServer()
