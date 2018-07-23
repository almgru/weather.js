/// ============================================================================
/// module parser.js
///
/// Responsible for extracting the relevant data from the json retreived from
/// the API and parsing it to an easier to handle format.
/// ============================================================================

import { isSameDay } from './util.js';

/**
 * parseWeatherData(json: Object)
 * 
 * Extracts the data with the relevant days (today, tomorrow) and the relevant
 * times (6:00, 12:00, 18:00). Also parses it to a 'forecast' Object with the 
 * following members:
 *
 * time : Date,
 * temperature : number,        // in degrees celcius
 * windDirection : number,      // in degrees
 * windSpeed : number,          // in m/s
 * cloudiness : number,         // in oktas
 * rain : number                // in mm/h
 *
 * The return value is a map where the keys are the dates (today, tomorrow) and
 * the values are an array of the forecast objects.
 */
export function parseWeatherData(json) {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let todaysTimeSeries = getTimeSeries(json, today, 6, 12, 18);
    let tomorrowsTimeSeries = getTimeSeries(json, tomorrow, 6, 12, 18);

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

        // Does the current data point match the provided date and any of the 
        // provided hours?
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
    forecast.rain = getParameterValue(params, 'pmean');

    return forecast;
}

function getParameterValue(params, key) {
    let parameter = params.find(param => param.name === key);
    let value = parameter.values[0];

    return value;
}

