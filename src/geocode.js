const request = require('request')


const geocode = (location,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoibmlzaGk5OSIsImEiOiJjbDU5NDQ0Z2IwdGV5M2hxbGk5bGM1YXFpIn0.VXma1AypbQoDt1rXM21zXQ'
    
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to location service')
        }else if(body.features.length === 0)
        {
            callback('unable to find location, Try another search')
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })

}



module.exports = geocode
