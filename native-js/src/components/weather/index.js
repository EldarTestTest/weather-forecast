import './index.css'
import {createContainer, setClassNames, createWeatherIcon} from "../../utils/element";
import constants from './constants';
import IconMatcher from '../../utils/matcher'
import _ from 'lodash';

export default (date, cloudiness, temperature, pressure, humidity, wind, feelsLike) => {
    let container = createContainer();
    setClassNames(container, '');
    //todo не забыть про стили
    let dayContainer = createContainer();
    dayContainer.innerHTML = computeDayLabelFromDate(date);
    let dateContainer = createContainer();
    dateContainer.innerHTML = computeDayMonthLabelFromDate(date);

    let cloudinessContainer = createContainer();
    let cloudinessContainerText = createContainer();
    let cloudinessContainerIcon = createContainer();
    cloudinessContainerText.innerHTML = IconMatcher.getLabel(cloudiness);
    let weatherIcon = createWeatherIcon(IconMatcher.getIconClasses(cloudiness));
    cloudinessContainerIcon.appendChild(weatherIcon);
    cloudinessContainer.appendChild(cloudinessContainerText);
    cloudinessContainer.appendChild(cloudinessContainerIcon);

    let temperatureContainer = createContainer();
    let temperatureContainerDay = createContainer();
    temperatureContainerDay.innerHTML = `${constants.dayTemperature} ${temperature.day}`;
    let temperatureContainerNight = createContainer();
    temperatureContainerNight.innerHTML = `${constants.nightTemperature} ${temperature.night}`;
    temperatureContainer.appendChild(temperatureContainerDay);
    temperatureContainer.appendChild(temperatureContainerNight);

    let pressureContainer = createContainer();
    pressureContainer.innerHTML = `${constants.pressure} ${pressure}`;

    let humidityContainer = createContainer();
    humidityContainer.innerHTML = `${constants.humidity} ${humidity}`;

    let windContainer = createContainer();
    windContainer.innerHTML = `${constants.wind} ${wind}`;

    let feelsLikeContainer = createContainer();
    feelsLikeContainer.innerHTML = `${constants.feelsLike} ${feelsLike}`;

    container.appendChild(dayContainer);
    container.appendChild(dateContainer);
    container.appendChild(cloudinessContainer);
    container.appendChild(temperatureContainer);
    container.appendChild(pressureContainer);
    container.appendChild(humidityContainer);
    container.appendChild(windContainer);
    container.appendChild(feelsLikeContainer);
    return container;
}


const computeDayLabelFromDate = date => {
    let day;
    if (_.isString(date)) {
        day = new Date(Date.parse(date));
    }
    if (_.isNumber(date) || _.isDate(date)) {
        day = new Date(date);
    }
    if (_.isNaN(day)) {
        console.error(computeDayLabelFromDate.name, 'Error parse date from json data store', date);
        return null;
    }
    let now = new Date();
    if (now.getDay() === day.getDay() &&
        now.getFullYear() === day.getFullYear() &&
        now.getMonth() === day.getMonth()) {
        return 'Сегодня';
    }
    switch (day.getDay()) {
        case 0:
            return constants.day.sunday;
        case 1:
            return constants.day.monday;
        case 2:
            return constants.day.tuesday;
        case 3:
            return constants.day.wednesday;
        case 4:
            return constants.day.thursday;
        case 5:
            return constants.day.friday;
        case 6:
            return constants.day.saturday;
    }
};

const computeDayMonthLabelFromDate = date => {
    let day;
    if (_.isString(date)) {
        day = new Date(Date.parse(date));
    }
    if (_.isNumber(date) || _.isDate(date)) {
        day = new Date(date);
    }
    if (_.isNaN(day)) {
        console.error(computeDayMonthLabelFromDate.name, 'Error parse date from json data store', date);
        return null;
    }
    switch (day.getMonth()) {
        case 0:
            return `${day.getDate()} ${constants.month.january}`;
        case 1:
            return `${day.getDate()} ${constants.month.february}`;
        case 2:
            return `${day.getDate()} ${constants.month.march}`;
        case 3:
            return `${day.getDate()} ${constants.month.april}`;
        case 4:
            return `${day.getDate()} ${constants.month.may}`;
        case 5:
            return `${day.getDate()} ${constants.month.june}`;
        case 6:
            return `${day.getDate()} ${constants.month.july}`;
        case 7:
            return `${day.getDate()} ${constants.month.august}`;
        case 8:
            return `${day.getDate()} ${constants.month.september}`;
        case 9:
            return `${day.getDate()} ${constants.month.october}`;
        case 10:
            return `${day.getDate()} ${constants.month.november}`;
        case 11:
            return `${day.getDate()} ${constants.month.december}`;
    }
};