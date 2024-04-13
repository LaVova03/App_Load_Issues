import { ADD_URL } from './actionTypes';

const initialState = {
    isUrl: '',
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_URL:
            return {
                ...state,
                isUrl: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer;


