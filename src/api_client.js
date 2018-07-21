export function get_forecast(latitude, longitude) {
    return new Promise(function(resolve, reject) {
        fetch(build_uri(latitude, longitude), { mode: 'cors'})
            .then(data => data.json())
            .then(resolve);
    });
}

function build_uri(lat, lon) {
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
