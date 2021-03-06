const initialState = {
    data:[],
    daysBefore: undefined, //количество элементов на экране до текущего дня(для тестого задания =0)
    daysAfter: undefined, //количество лементов на экране после текущего дня(для тестого задания =3)
};

export default function weatherDataReducer(state = initialState, action) {
    if(action.type === "ADD_WEATHER_DATA"){
        return {
            ...state,
            data: [...state.data, ...action.payload]
        };
    }
    if(action.type === "ADD_DAYS_BEFORE"){
        return {
            ...state,
            daysBefore: action.payload
        };
    }
    if(action.type === "ADD_DAYS_AFTER"){
        return {
            ...state,
            daysAfter: action.payload
        };
    }
    return state;
}