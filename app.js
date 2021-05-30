const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));


app.get('/' , (req,res)=> {


    res.sendFile(`${__dirname}/index.html`);

});

app.post('/' , (req , res) => {

    const query = req.body.cityName.charAt(0).toUpperCase() +  req.body.cityName.slice(1);
    const apiKey = "7fcaa087b00f89d56e4a982ea6553a30"
    const units = "metric"
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    
    https.get(url , (resp) => {
        console.log('Status Code : ' , resp.statusCode);
        console.log('Header : ' ,resp.statusCode);
        console.log(query);


        resp.on('data' , (data) => {
            const wheatherData = JSON.parse(data);
            const temp = wheatherData.main.temp;
            const icon = wheatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const wheatherDescription = wheatherData.weather[0].description;


            res.setHeader('Content-Type'  , 'text/html; charset=utf-8');
            res.write(`<h2>Temp : ${wheatherDescription} </h2>`);
            res.write(`<h1>Il fait ${temp} °C  à ${query} </h1>`);
            res.write(`<img src=${imageUrl} alt="clouds">`);
            res.send();
            // res.send();
           
        })
    });


})






app.listen(3000 , ()=> console.log('Serveur demarré sur le port 3000'))