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
    setClassNames(prevDay, 'weatherGridLeftButton');
    let nextDay = createButton(constants.nextDayText, constants.nextDayTitle,
        constants.stylesRightButton.iconName, null, constants.stylesRightButton.classNames,
        constants.stylesRightButton.fontSize);
    setClassNames(nextDay, 'weatherGridRightButton');

    let gridContainer = initGrid(getWeatherData(), getDaysBefore(), getDaysAfter());


    let container = createContainer();
    setClassNames(container, 'weatherGrid');
    container.appendChild(prevDay);
    container.appendChild(gridContainer);
    container.appendChild(nextDay);
    return container;
}

const initGrid = (data, countBeforeDays, countAfterDays) => {
    let countDaysInGrid = countBeforeDays + countAfterDays + 1;
    let container = createContainer();
    setClassNames(container, 'weatherGridContainer');
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
                let k = 1;
                if (countBeforeDays > 0) {
                    while (i <= countBeforeDays) {
                        let dataCurrent = indexCurrentDay - k >= 0 ? data[indexCurrentDay - k] : null;
                        let date = getDateFromData(dataCurrent);
                        let dateBefore = getDateBeforeNow(i);
                        if (date != null && date.getFullYear() === dateBefore.getFullYear() &&
                            date.getMonth() === dateBefore.getMonth() && date.getDate() === dateBefore.getDate()) {
                            resultArray.unshift(dataCurrent);
                            k++;
                        } else {
                            //если вчерашний день невчерашний(дата предыдущего елемента в массиве другая) тогда ставим null
                            //такое может произойти в случае если день не указан(упущен) в массиве данных
                            resultArray.unshift(null);
                        }
                        i++;
                    }
                }
                //запоминаем дни после сегодняшнего
                i = 1; //количество сколько добавили
                k = 1; //количество дней без учета упущенных дней
                if (countAfterDays > 0) {
                    while (i <= countAfterDays) {
                        let dataCurrent = indexCurrentDay + k < data.length ? data[indexCurrentDay + k] : null;
                        let date = getDateFromData(dataCurrent);
                        let dateAfter = getDateAfterNow(i);
                        if (date != null && date.getFullYear() === dateAfter.getFullYear() &&
                            date.getMonth() === dateAfter.getMonth() && date.getDate() === dateAfter.getDate()) {
                            resultArray.push(dataCurrent);
                            k++;
                        } else {
                            //если завтрашний день незавтрашний(дата следующего елемента в массиве другая) тогда ставим null
                            //такое может произойти в случае если день не указан(упущен) в массиве данных
                            resultArray.push(null);
                        }
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
    if (weatherData == null) {
        return null;
    }
    return _.isString(weatherData.date) && weatherData.date !== '' ?
        new Date(Date.parse(weatherData.date)) :
        (_.isNumber(weatherData.date) || _.isDate(weatherData.date)) ?
            new Date(weatherData.date) : null;
};

const getDateBeforeNow = (countDays) => {
    //возвращает дату в (сегодня - колво дней(countDays))
    return new Date(new Date().setDate((new Date()).getDate() - countDays))
};


const getDateAfterNow = (countDays) => {
    //возвращает дату в (сегодня + колво дней(countDays))
    return new Date(new Date().setDate((new Date()).getDate() + countDays))
};