import _ from 'lodash'

export const createContainer = () => {
    return document.createElement('div');
};

export const createImg = (srcPath) => {
    let img = document.createElement('img');
    img.src = srcPath;
    return img;
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
    } else if (element instanceof HTMLElement && _.isString(classNames)) {
        element.classList.add(...classNames.split(' '))
    }
};

export const createWeatherIcon = classNames => {
    let htmlElement = document.createElement('i');
    setClassNames(htmlElement, classNames);
    return htmlElement;
};