/// Module parser.js
///
/// 
///

import { isSameDay } from './util.js';

/* function parse_weather_data(json: Object)
 * 
 * Extracts the relevant data from the weather data retreived from the API call.
 */
export function parseWeatherData(json) {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let todaysTimeSeries = getTimeSeries(json, today, 6, 12, 18);
    let tomorrowsTimeSeries = getTimeSeries(json, tomorrow, 6, 12, 18);
    console.log(todaysTimeSeries);
    console.log(tomorrowsTimeSeries);

    let todaysForecasts = [];

    for (let i = 0; i < todaysTimeSeries.length; i++) {
        todaysForecasts.push(parseWeatherForecast(todaysTimeSeries[i]));
    }

    let tomorrowsForecasts = [];

    for (let i = 0; i < tomorrowsTimeSeries.length; i++) {
        tomorrowsForecasts.push(parseWeatherForecast(tomorrowsTimeSeries[i]));
    }

    let allForecasts = new Map();
    allForecasts.set(today, todaysForecasts);
    allForecasts.set(tomorrow, tomorrowsForecasts);

    console.log("Forecasts: ");
    console.log(allForecasts);

    return allForecasts;
}

function getTimeSeries(json, date, ...hours) {
    let result = [];
    let timeSeries = json.timeSeries;

    for (let i = 0; i < timeSeries.length; i++) {
        let dataPoint = timeSeries[i];
        let dpDate = new Date(Date.parse(dataPoint.validTime));

        // Get the hours provided in the varargs argument
        let hourVarargs = Array.from(arguments).splice(2, arguments.length);

        // Does the current data point match the provided date and any of the provided hours?
        if (hourVarargs.some(hour => hour === dpDate.getHours()) 
                && isSameDay(date, dpDate)) {
            result.push(dataPoint);
        }
    }

    return result;
}

function parseWeatherForecast(dataPoint) {
    let forecast = {};
    let params = dataPoint.parameters;

    forecast.time = new Date(Date.parse(dataPoint.validTime));
    forecast.temperature = getParameterValue(params, 't');
    forecast.windDirection = getParameterValue(params, 'wd');
    forecast.windSpeed = getParameterValue(params, 'ws');
    forecast.cloudiness = getParameterValue(params, 'tcc_mean');
    forecast.symbol = getParameterValue(params, 'Wsymb2');

    return forecast;
}

function getParameterValue(params, key) {
    let parameter = params.find(param => param.name === key);
    let value = parameter.values[0];

    return value;
}

