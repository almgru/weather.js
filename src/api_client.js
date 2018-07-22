/// ============================================================================
/// module api_client.js
/// Module responsible for fetching the forecast data from the API.
/// ============================================================================

/**
 * getForecast(latitude : number, longitude : number)
 *
 * Fetches the forecast data from the API and converts it to json.
 *
 * Returns a promise that will be fulfilled when the forecast data has been 
 * recieved and converted.
 */
export function getForecasts(latitude, longitude) {
    return new Promise(function(resolve, reject) {
        fetch(buildUri(latitude, longitude))
            .then(data => data.json())
            .then(resolve);
    });
}

function buildUri(lat, lon) {
    const endpoint = 'https://opendata-download-metfcst.smhi.se/';
    const category = 'pmp3g';
    const version = '2';
    const geotype = 'point';

    let uri = endpoint + 'api/';
    uri += 'category/' + category + '/';
    uri += 'version/' + version + '/';
    uri += 'geotype/' + geotype + '/';
    uri += 'lon/' + lon + '/';
    uri += 'lat/' + lat + '/';

    uri += 'data.json';

    return uri;
}
