import './index.css'
import {createContainer, setClassNames} from '../../utils/element'
import createButton from '../button'
import createWeather from '../weather'

export default () => {
    let prevDay = createButton(null, 'Предыдущий день');
    let nexDay = createButton(null, 'Следующий день');
}