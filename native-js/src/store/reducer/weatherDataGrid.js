const initialState = {
    indexCurrentDay: undefined,
    dataGridRef: null
};

export default function weatherDataGridReducer(state = initialState, action) {
    if (action.type === 'INIT_GRID_CONTAINER_REF') {
        return {
            ...state,
            dataGridRef: action.payload
        };
    }
    if (action.type === 'INIT_INDEX_CURRENT_DAY') {
        return {
            ...state,
            indexCurrentDay: action.payload
        };
    }
    return state;
}