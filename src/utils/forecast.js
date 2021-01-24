const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d848386fb3e66f46b731e5b3a7938b80&query=' + lat + ',' + long + '&units=m';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const degrees = body.current.temperature;
            const humidityPercent = body.current.humidity;
            const output = `It is currently ${degrees} degrees, and the humidity is ${humidityPercent} percent.`;
            callback(undefined, output);
        }
});
}

module.exports = forecast;