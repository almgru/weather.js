import { getForecast } from './api_client.js';
import { parseWeatherData } from './parser.js';
import { generateHtml } from './html_generator.js';

getForecast(56.87767, 14.80906)
    .then(parseWeatherData)
    .then(generateHtml);

