import {getTitle} from './utils/store'
import {createContainer, setClassNames} from './utils/element'
import titleComponent from './components/title'
import weatherGridComponent from './components/weatherGrid'
import './index.css'


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
    let contentContainer = createContainer();
    setClassNames(contentContainer, 'contentContainer');
    let weatherGrid = weatherGridComponent();
    contentContainer.appendChild(weatherGrid);
    root.appendChild(contentContainer);
}());