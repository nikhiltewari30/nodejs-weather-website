const request = require('request')


const forecast = (latitude,longitude,callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=6b24a154a5ad8741aafb4d9241530bbf&query="+latitude+","+longitude+"&units=m"
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect to weather service')
        }else if(body.error)
        {
            callback('unable to find location')
        }else{
            callback(undefined,body)
        }
    })
}

module.exports = forecast;