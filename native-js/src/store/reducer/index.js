import {combineReducers} from "redux";
import weatherData from './weatherData'
import weatherDataGrid from "./weatherDataGrid";

export default combineReducers({
    weatherData,
    weatherDataGrid
});