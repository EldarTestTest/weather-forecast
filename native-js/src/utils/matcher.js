import * as store from './store'
import _ from 'lodash'

class IconMatcher {

    getLabel(cloudiness) {
        return _.isArray(store.getMatcher()) ?
            store.getMatcher().find(item => {
                return item.value === cloudiness
            }).label :
            null;
    }

    getIconClasses(cloudiness){
        return _.isArray(store.getMatcher()) ?
            store.getMatcher().find(item =>{
                return item.value === cloudiness
            }).icon.style : '';
    }

}

export default new IconMatcher();