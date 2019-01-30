import data from '../../public/data'

const store = data;


export const getTitle = () => {
    return data.title;
};

export const getMatcher = () => {
    return data.matcherIconCloudiness;
};

export default store;