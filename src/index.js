import { get_forecast } from './api_client.js';

get_forecast(56.87767, 14.80906).then(log);

function log(txt) {
    console.log(txt);
}
