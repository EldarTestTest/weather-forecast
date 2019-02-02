import './index.css'
import {createContainer, createButton, setClassNames} from '../../utils/element'

export default (text, title, icon, onClickAction, classNames) => {
    let containerButton = createContainer();

    let button = createButton(text, title);
    button.onclick = onClickAction;
    setClassNames(button, classNames);
    //todo добавление иконки

    containerButton.appendChild(button);
    return containerButton;
}