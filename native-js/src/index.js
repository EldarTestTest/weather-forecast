import IconMatcher from './utils/matcher'
import {getTitle} from './utils/store'
import './index.css'

console.log("js has been started");
console.log(getTitle());

(function initTitle() {
    let title = document.createElement('div');
    title.innerHTML = getTitle();
    weatherTitle.appendChild(title);
}());
