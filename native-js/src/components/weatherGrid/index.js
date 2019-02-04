import './index.css'
import {createContainer, setClassNames} from '../../utils/element'
import createButton from '../button'
import createWeather, {createEmptyWeather} from '../weather'
import constants from './constants'
import {getWeatherData, getDaysAfter, getDaysBefore} from '../../utils/store'
import _ from 'lodash'
import store from '../../store/store'

export default () => {
    let prevDay = createButton(constants.prevDayText, constants.prevDayTitle,
        constants.stylesLeftButton.iconName, leftButtonAction, constants.stylesLeftButton.classNames,
        constants.stylesLeftButton.fontSize);
    setClassNames(prevDay, 'weatherGridLeftButton');
    let nextDay = createButton(constants.nextDayText, constants.nextDayTitle,
        constants.stylesRightButton.iconName, rightButtonAction, constants.stylesRightButton.classNames,
        constants.stylesRightButton.fontSize);
    setClassNames(nextDay, 'weatherGridRightButton');

    // let gridContainer = initGrid(getWeatherData(), getDaysBefore(), getDaysAfter());
    let gridContainer = initializeGrid();

    let container = createContainer();
    setClassNames(container, 'weatherGrid');
    container.appendChild(prevDay);
    container.appendChild(gridContainer);
    container.appendChild(nextDay);
    return container;
}

const rightButtonAction = () => {
    if (_.isArray(store.getState().weatherData.data) &&
        _.isNumber(store.getState().weatherDataGrid.indexCurrentDay) &&
        _.isNumber(store.getState().weatherData.daysBefore) &&
        _.isNumber(store.getState().weatherData.daysAfter) &&
        !_.isUndefined(store.getState().weatherDataGrid.dataGridRef) &&
        !_.isNull(store.getState().weatherDataGrid.dataGridRef)) {

        if (store.getState().weatherDataGrid.indexCurrentDay +
            store.getState().weatherData.daysAfter <
            store.getState().weatherData.data.length - 1) {
            store.dispatch(
                {
                    type: 'INIT_INDEX_CURRENT_DAY',
                    payload: store.getState().weatherDataGrid.indexCurrentDay + 1
                }
            );
        }
    }
};

const leftButtonAction = () => {
    if (_.isArray(store.getState().weatherData.data) &&
        _.isNumber(store.getState().weatherDataGrid.indexCurrentDay) &&
        _.isNumber(store.getState().weatherData.daysBefore) &&
        _.isNumber(store.getState().weatherData.daysAfter) &&
        !_.isUndefined(store.getState().weatherDataGrid.dataGridRef) &&
        !_.isNull(store.getState().weatherDataGrid.dataGridRef)) {

        if (store.getState().weatherDataGrid.indexCurrentDay > 1) {
            //todo учесть то что перед текущим днем могут находиться элементы
            store.dispatch(
                {
                    type: 'INIT_INDEX_CURRENT_DAY',
                    payload: store.getState().weatherDataGrid.indexCurrentDay - 1
                }
            );
        }
    }
};

const initializeGrid = () => {
    let container = createContainer();
    setClassNames(container, 'weatherGridContainer');
    container.id = 'gridWeatherData';
    store.dispatch({type: 'INIT_GRID_CONTAINER_REF', payload: container.id});
    return container;
};

const renderData = () => {
    if (_.isArray(store.getState().weatherData.data) &&
        _.isNumber(store.getState().weatherDataGrid.indexCurrentDay) &&
        _.isNumber(store.getState().weatherData.daysBefore) &&
        _.isNumber(store.getState().weatherData.daysAfter) &&
        !_.isUndefined(store.getState().weatherDataGrid.dataGridRef) &&
        !_.isNull(store.getState().weatherDataGrid.dataGridRef)) {
        let resultArray = [];
        if (store.getState().weatherDataGrid.indexCurrentDay >= 0 &&
            store.getState().weatherDataGrid.indexCurrentDay <
            store.getState().weatherData.data.length) {
            resultArray.push(store.getState()
                .weatherData.data[store.getState().weatherDataGrid.indexCurrentDay])
        }
        if (store.getState().weatherData.daysBefore > 0) {
            let i = 1;
            while (i <= store.getState().weatherData.daysBefore) {
                if (store.getState().weatherDataGrid.indexCurrentDay - i >= 0) {
                    let dataCurrent = store.getState().weatherData
                        .data[store.getState().weatherDataGrid.indexCurrentDay - i];
                    resultArray.unshift(dataCurrent);
                } else {
                    break;
                }
                i++;
            }
        }
        if (store.getState().weatherData.daysAfter > 0) {
            let i = 1;
            while (i <= store.getState().weatherData.daysAfter) {
                if (store.getState().weatherDataGrid.indexCurrentDay + i <
                    store.getState().weatherData.data.length) {
                    let dataCurrent = store.getState().weatherData
                        .data[store.getState().weatherDataGrid.indexCurrentDay + i];
                    resultArray.push(dataCurrent);
                } else {
                    break;
                }
                i++;
            }
        }
        let element = document.getElementById(store.getState().weatherDataGrid.dataGridRef);
        if (!_.isEmpty(resultArray) && element !== undefined && element != null) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            _.forEach(resultArray, (weatherData) => {
                let weather = weatherData != null ?
                    createWeather(weatherData.date, weatherData.cloudiness,
                        weatherData.temperature, weatherData.pressure, weatherData.humidity,
                        weatherData.wind, weatherData.feelsLike) :
                    createEmptyWeather();
                element.appendChild(weather);
            });
        }
    }
};

store.subscribe(renderData);

const initGrid = (data, countBeforeDays, countAfterDays) => {
    //todo метод который инициализированл элементы с данными без redux
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