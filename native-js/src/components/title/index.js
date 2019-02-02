import './index.css'
import {createContainer, setClassNames} from '../../utils/element'

export default (titleText) => {
    let container = createContainer();
    container.innerHTML = titleText;
    setClassNames(container, 'titleContainerText');
    return container;
}