const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'daniel'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'df'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help is on its way!',
        name: 'df'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location.'
            }
        )
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({forecastError})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page not found',
        message: 'Please check the url.',
        name: 'df'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'Please check the url.',
        name: 'df'
    })
});

app.listen(port, () => {
    console.log('Server is up on Port ' + port);
});