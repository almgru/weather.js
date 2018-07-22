/// ============================================================================
/// Module html_generator.js
/// ============================================================================

import { isSameDay } from './util.js';

/**
 * generateHtml(weatherData : Object)
 */
export function generateHtml(weatherData) {
    const EXPECTED_ROWS = 3;
    let root = document.querySelector('#weather_app');

    for (let day of weatherData.keys()) {
        let dayData = weatherData.get(day);
        let table = generateDayTable(day, dayData, EXPECTED_ROWS);
        root.appendChild(table);
    }
}

function generateDayTable(day, dayData, expectedRows) {
    const NR_OF_COLS = 5;

    let table = document.createElement('table');
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (isSameDay(today, day)) {
        table.appendChild(generateTableHeader(["Idag"], NR_OF_COLS));
    }
    else if (isSameDay(tomorrow, day)) {
        table.appendChild(generateTableHeader(["Imorgon"], NR_OF_COLS));
    }

    table.appendChild(generateTableHeader(["Tid", "Temp", "Vind", "Regn", 
            "Himmel"]));

    let rowsAdded = 0;
    for (let timeData of dayData) {
        let timeDiv = generateTimeRow(timeData);
        table.appendChild(timeDiv);
        rowsAdded++;
    }

    for (let i = rowsAdded; i < expectedRows; i++) {
        table.appendChild(generatePlaceholderRow(NR_OF_COLS));
    }

    return table; 
}

function generateTimeRow(forecast) {
    let tr = document.createElement('tr');

    let tdTime = document.createElement('td');
    tdTime.appendChild(document.createTextNode(forecast.time.getHours()));
    tr.appendChild(tdTime);

    let tdTemp = document.createElement('td');
    tdTemp.appendChild(document.createTextNode(forecast.temperature + ' °C'));
    tr.appendChild(tdTemp);

    let tdWind = document.createElement('td');
    tdWind.appendChild(generateWindDirectionArrow(forecast.windDirection));
    tdWind.appendChild(document.createTextNode(forecast.windSpeed + ' m/s'));
    tr.appendChild(tdWind);

    let tdRain = document.createElement('td');
    tdRain.appendChild(document.createTextNode(forecast.rain + ' mm'));
    tr.appendChild(tdRain);

    let tdCloud = document.createElement('td');
    tdCloud.appendChild(document.createTextNode(getCloudinessDescription(
            forecast.cloudiness)));
    tr.appendChild(tdCloud);

    return tr;
}

function generateTableHeader(headers, span = 1) {
    let tr = document.createElement('tr');

    for (let header of headers) {
        let th = document.createElement('th');

        th.setAttribute("colspan", span);
        th.appendChild(document.createTextNode(header));
        tr.appendChild(th);
    }

    return tr;
}

function generateWindDirectionArrow(windDirection) {
    const DEFAULT_ARROW_DEG = 45;
    let windDirectionArrow = document.createElement('span');

    windDirectionArrow.style['border'] = 'solid black';
    windDirectionArrow.style['border-width'] = '0 3px 3px 0';
    windDirectionArrow.style['display'] = 'inline-block';
    windDirectionArrow.style['padding'] = '3px';
    windDirectionArrow.style['margin'] = '0 10px 0 10px';
    windDirectionArrow.style['transform'] = 'rotate(' + (DEFAULT_ARROW_DEG 
            + windDirection) + 'deg)';

    return windDirectionArrow;
}

function getCloudinessDescription(cloudinessValue) {
    switch (cloudinessValue) {
        case 0:
            return "Klart";

        case 1:
        case 2:
            return "Mestadels klart";

        case 3:
        case 4:
        case 5:
            return "Halvklart";

        case 6:
        case 7:
            return "Mestadels mulet";

        case 8:
            return "Mulet";
    }
}

function generatePlaceholderRow(span) {
    let tr = document.createElement('tr');
    
    let td = document.createElement('td');
    td.setAttribute('colspan', span);
    td.appendChild(document.createTextNode("Prognos ej tillgänglig"));
    tr.appendChild(td);

    return tr;
}

