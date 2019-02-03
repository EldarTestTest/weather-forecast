import './index.css'
import {createContainer, setClassNames} from '../../utils/element'
import createButton from '../button'
import createWeather from '../weather'
import constants from './constants'

export default () => {
    let prevDay = createButton(constants.prevDayText, constants.prevDayTitle,
        constants.stylesLeftButton.iconName, null, constants.stylesLeftButton.classNames,
        constants.stylesLeftButton.fontSize);
    let nexDay = createButton(constants.nextDayText, constants.nextDayTitle,
        constants.stylesRightButton.iconName, null, constants.stylesRightButton.classNames,
        constants.stylesRightButton.fontSize);

    let gridContainer = createContainer();


    let container = createContainer();
    container.appendChild(prevDay);
    container.appendChild(gridContainer);
    container.appendChild(nexDay);
    return container;
}