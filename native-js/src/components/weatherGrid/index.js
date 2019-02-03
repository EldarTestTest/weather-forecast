import './index.css'
import {createContainer, setClassNames} from '../../utils/element'
import createButton from '../button'
import createWeather, {createEmptyWeather} from '../weather'
import constants from './constants'
import {getWeatherData, getDaysAfter, getDaysBefore} from '../../utils/store'
import _ from 'lodash'

export default () => {
    let prevDay = createButton(constants.prevDayText, constants.prevDayTitle,
        constants.stylesLeftButton.iconName, null, constants.stylesLeftButton.classNames,
        constants.stylesLeftButton.fontSize);
    let nexDay = createButton(constants.nextDayText, constants.nextDayTitle,
        constants.stylesRightButton.iconName, null, constants.stylesRightButton.classNames,
        constants.stylesRightButton.fontSize);

    let gridContainer = initGrid(getWeatherData(), getDaysBefore(), getDaysAfter());


    let container = createContainer();
    container.appendChild(prevDay);
    container.appendChild(gridContainer);
    container.appendChild(nexDay);
    return container;
}

const initGrid = (data, countBeforeDays, countAfterDays) => {
    let countDaysInGrid = countBeforeDays + countAfterDays + 1;
    let container = createContainer();
    if (_.isArray(data)) {
        let indexCurrentDay = 0;
        let resultArray = [];
        _.forEach(data, (weatherData) => {
            let dateOfWeatherData = getDateFromData(weatherData);
            let curDate = new Date();
            //если дата в данных совпала с сегодняшним днем
            if (dateOfWeatherData != null &&
                dateOfWeatherData.getDate() === curDate.getDate() &&
                dateOfWeatherData.getMonth() === curDate.getMonth() &&
                dateOfWeatherData.getFullYear() === curDate.getFullYear()) {
                //находим среди данных и запоминаем дату совпадающий с сегодняшним днем
                resultArray.push(weatherData);
                //запоминаем дни которые отобразить до сегодняшнего дня(для задания оно должно быть 0)
                let i = 1;
                if (countBeforeDays > 0) {
                    while (i <= countBeforeDays) {
                        resultArray.unshift(indexCurrentDay - i >= 0 ? data[indexCurrentDay - i] : null);
                        i++;
                    }
                }
                //запоминаем дни после сегодняшнего
                i = 1;
                if (countAfterDays > 0) {
                    while (i <= countAfterDays) {
                        resultArray.push(indexCurrentDay + i < data.length ? data[indexCurrentDay + i] : null);
                        i++;
                    }
                }
            }
            indexCurrentDay++;
        });
        if (resultArray.length === 0) {
            resultArray = _.range(countDaysInGrid).map(() => {
                return null
            });
        }
        //теперь в resultArray леджат все данные в нужно последовательности - необходимо только отобразить таблице
        _.forEach(resultArray, (weatherData) => {
            let weather = weatherData != null ? createWeather(weatherData.date, weatherData.cloudiness, weatherData.temperature,
                weatherData.pressure, weatherData.humidity, weatherData.wind, weatherData.feelsLike) :
                createEmptyWeather();
            container.appendChild(weather);
        });
    }
    return container;

};


const getDateFromData = (weatherData) => {
    return _.isString(weatherData.date) && weatherData.date !== '' ?
        new Date(Date.parse(weatherData.date)) :
        (_.isNumber(weatherData.date) || _.isDate(weatherData.date)) ?
            new Date(weatherData.date) : null;
};

