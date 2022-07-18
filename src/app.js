const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./forecast.js')
const geocode = require('./geocode.js')

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


app.get('',(req,res)=>{
    res.render('index',{title:'Weather-app',name:'Nikhil Tewari'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About Me',name:'Nikhil Tewari'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',name:'Nikhil Tewari'})
})



app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({error:"no address provided"})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }
        forecast(latitude,location,(error,{current})=>{
            if(error){
                return res.send({error:error})
            }
            res.send({
                location:location,
                message:current.weather_descriptions+'. it is currently '+current.temperature+' degree out'
            })

        })

    })
   
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({error:'search term not found'})
    }

    res.send({products:[]})

})

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404',error:'Help Article not found',name:'Nikhil Tewari'})
})

app.get('*',(req,res)=>{
    res.render('404',{title:'404',error:'Page not found',name:'Nikhil Tewari'})
    })



app.listen(3000,()=>{
    console.log("server running")
})