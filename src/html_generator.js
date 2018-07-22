export function generateHtml(weatherData) {
    let root = document.querySelector('#weather_app');

    for (let day of weatherData.keys()) {
        let dayData = weatherData.get(day);
        let table = generateDayTable(day, dayData);
        root.appendChild(table);
    }
}

function generateDayTable(day, dayData) {
    let table = document.createElement('table');
    table.appendChild(generateTableHeader(day.toTimeString()));
    table.appendChild(generateTableHeader("Tid", "Temp", "Vind", "Himmel"));

    for (let timeData of dayData) {
        let timeDiv = generateTimeRow(timeData);
        table.appendChild(timeDiv);
    }

    return table; 
}

function generateTimeRow(timeData) {
    let timeTr = document.createElement('tr');
    let time = new Date(Date.parse(timeData.validTime)).getHours();

    let timeTd = document.createElement('td');
    timeTd.appendChild(document.createTextNode(time));

    timeTr.appendChild(timeTd);

    return timeTr;
}

function generateTableHeader(...headerNames) {
    let tr = document.createElement('tr');

    for (let name of arguments) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(name));
        tr.appendChild(th);
    }

    return tr;
}
