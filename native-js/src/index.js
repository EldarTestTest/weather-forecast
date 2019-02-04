import {getTitle} from './utils/store'
import {createContainer, setClassNames} from './utils/element'
import titleComponent from './components/title'
import weatherGridComponent from './components/weatherGrid'
import './index.css'
import store from './store/store'
import {getWeatherData, getDaysAfter, getDaysBefore} from './utils/store'
import _ from "lodash";

(function initTitle() {
    //init title component
    let titleContainer = createContainer();
    setClassNames(titleContainer, ['titleContainer']);
    let titleText = titleComponent(getTitle());
    titleContainer.appendChild(titleText);
    root.appendChild(titleContainer);
}());


(function initWeatherData() {
    //init content
    store.dispatch({type: 'ADD_WEATHER_DATA', payload: getWeatherData()});
    store.dispatch({type: 'ADD_DAYS_BEFORE', payload: getDaysBefore()});
    store.dispatch({type: 'ADD_DAYS_AFTER', payload: getDaysAfter()});
    let contentContainer = createContainer();
    setClassNames(contentContainer, 'contentContainer');
    let weatherGrid = weatherGridComponent();
    contentContainer.appendChild(weatherGrid);
    root.appendChild(contentContainer);
    initCurrentDay();
}());


function initCurrentDay() {
    if (store.getState().weatherDataGrid.indexCurrentDay === undefined) {
        let index = null;
        let k = 0;
        _.forEach(store.getState().weatherData.data, (weatherData) => {
            let dateOfWeatherData = getDateFromData(weatherData);
            let curDate = new Date();
            if (dateOfWeatherData != null &&
                dateOfWeatherData.getDate() === curDate.getDate() &&
                dateOfWeatherData.getMonth() === curDate.getMonth() &&
                dateOfWeatherData.getFullYear() === curDate.getFullYear()) {
                index = k;
            }
            k++;
        });
        store.dispatch({type: 'INIT_INDEX_CURRENT_DAY', payload: index});
    }
}

function getDateFromData(weatherData){
    if (weatherData == null) {
        return null;
    }
    return _.isString(weatherData.date) && weatherData.date !== '' ?
        new Date(Date.parse(weatherData.date)) :
        (_.isNumber(weatherData.date) || _.isDate(weatherData.date)) ?
            new Date(weatherData.date) : null;
};
