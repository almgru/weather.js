import { getForecasts } from './api_client.js';
import { parseWeatherData } from './parser.js';
import { generateHtml } from './html_generator.js';
import { getGeoCoordinates } from './util.js';

window.addEventListener('load', event => {
    let geoCoords = getGeoCoordinates();

    getForecasts(geoCoords.latitude, geoCoords.longitude)
        .then(parseWeatherData)
        .then(generateHtml);
});
