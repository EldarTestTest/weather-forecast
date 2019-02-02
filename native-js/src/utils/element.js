import _ from 'lodash'

export const createContainer = () => {
    return document.createElement('div');
};

export const createButton = (text, title) => {
    let htmlElement = document.createElement('button');
    htmlElement.title = title;
    htmlElement.innerHTML = text;
    htmlElement.onclick;
    return htmlElement;
};

export const setClassNames = (element, classNames) => {
    if (element instanceof HTMLElement && _.isArray(classNames)) {
        element.classList.add(...classNames)
    } else if(element instanceof HTMLElement && _.isString(classNames)){
        element.classList.add(...classNames.split(' '))
    }
};