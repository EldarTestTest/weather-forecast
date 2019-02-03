import data from '../../public/data.json'
import _ from 'lodash'

const store = data;


export const getTitle = () => {
    return store.title;
};

export const getDaysBefore = () => {
    return store.daysBefore;
};

export const getDaysAfter = () => {
    return store.daysAfter;
};

export const getMatcher = () => {
    return store.matcherIconCloudiness;
};

export const getWeatherData = () => {
    if (_.isArray(store.data)) {
        let array = store.data;
        array = _.filter(store.data, (weather) => {
            return _.isString(weather.date) && weather.date !== '' ?
                new Date(Date.parse(weather.date)) :
                (_.isNumber(weather.date) || _.isDate(weather.date)) ?
                    new Date(weather.date) : new Date('1970-01-01');
        });
        /*array = array.sort((a, b) => {
            let dateA = _.isString(a.date) && weather.date !== '' ?
                new Date(Date.parse(a.date)) :
                (_.isNumber(a.date) || _.isDate(a.date)) ?
                    new Date(a.date) : new Date('1970-01-01');
            let dateB = _.isString(b.date) && weather.date !== '' ?
                new Date(Date.parse(b.date)) :
                (_.isNumber(b.date) || _.isDate(b.date)) ?
                    new Date(b.date) : new Date('1970-01-01');
            return dateA - dateB;
        });*/
        return array;
    }
    console.error('Error init weather data', store.data);
};

export default store;