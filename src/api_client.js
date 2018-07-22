export function getForecast(latitude, longitude) {
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
