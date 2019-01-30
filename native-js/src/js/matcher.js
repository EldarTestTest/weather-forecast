import * as store from './store'
import _ from 'lodash'

class IconMatcher {

    getLable(cloudiness) {
        return _.isArray(store.getMatcher()) ?
            store.getMatcher().find(item => {
                return item.value === cloudiness
            }).label :
            null;
    }

}

export default new IconMatcher();