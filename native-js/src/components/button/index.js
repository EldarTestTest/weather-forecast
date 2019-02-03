import './index.css'
import {createContainer, createButton, setClassNames} from '../../utils/element'

export default (text, title, icon, onClickAction, classNames, iconSize) => {
    let containerButton = createContainer();

    let button = createButton(text, title);
    button.onclick = onClickAction;
    setClassNames(button, classNames);
    setClassNames(button, 'Button');
    button.innerHTML = icon;
    button.style.fontSize = iconSize;

    containerButton.appendChild(button);
    return containerButton;
}