import IconMatcher from './utils/matcher'
import {getTitle} from './utils/store'
import {createContainer, setClassNames} from './utils/element'
import titleComponent from './components/title'
import weatherGridComponent from './components/weatherGrid'
import './index.css'

console.log("js has been started");
console.log(getTitle());

(function initTitle() {
    //init title component
    let titleContainer = createContainer();
    setClassNames(titleContainer, ['titleContainer', 'testBorderRed']);
    let titleText = titleComponent(getTitle());
    titleContainer.appendChild(titleText);


    let contentContainer = createContainer();
    let weatherGrid = weatherGridComponent();
    contentContainer.appendChild(weatherGrid);


    root.appendChild(titleContainer);
    root.appendChild(contentContainer);
}());
