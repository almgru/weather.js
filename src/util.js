/// ============================================================================
/// Module util.js
/// ============================================================================

/**
 * isSameDay(d1 : Date, d2 : Date)
 */
export function isSameDay(d1, d2) {
    if (d1.getFullYear() !== d2.getFullYear()) {
        return false;
    }
    else if (d1.getMonth() !== d2.getMonth()) {
        return false;
    }
    else if (d1.getDate() !== d2.getDate()) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * getGeoCoordinates()
 */
export function getGeoCoordinates() {
    let geoCoords = {};

    let weatherDiv = document.querySelector('#weather_app');
    geoCoords.latitude = weatherDiv.getAttribute('lat');
    geoCoords.longitude = weatherDiv.getAttribute('lon');

    return geoCoords;
}
