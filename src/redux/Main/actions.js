import { ADD_URL } from './actionTypes';

export const addUrl = (isUrl) => ({
    type: ADD_URL,
    payload: isUrl,
})
