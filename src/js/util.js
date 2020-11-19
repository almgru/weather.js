/// ============================================================================
/// module util.js
///
/// Some utility functions that did not fit any of the other modules.
/// ============================================================================

/**
 * isSameDay(d1 : Date, d2 : Date)
 *
 * Checks if two dates are on the same day.
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
 *
 * Extracts the values for the attributes 'lat' and 'lon' from the div with the
 * id 'weather_widget' and returns it in an Object with the format:
 *
 * latitude : number,
 * longitude : number
 */
export function getGeoCoordinates() {
    let geoCoords = {};

    let weatherDiv = document.querySelector('#weather_widget');
    geoCoords.latitude = weatherDiv.getAttribute('lat');
    geoCoords.longitude = weatherDiv.getAttribute('lon');

    return geoCoords;
}

