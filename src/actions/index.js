import {OPEN_MODAL, CLOSE_MODAL, SEARCH_VIDEO, SEARCH_ASYNC_ENTITIES, IS_LOADING } from "../actions-types/index";

export const openModal = mediaId => ({ type: OPEN_MODAL, payload: { mediaId } });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const searchVideo = query => ({ type: SEARCH_VIDEO, payload: { query } });

export function isLoading(value) {
    return {
        type: IS_LOADING,
        payload: {
            value
        }
    }
}

export function searchAsyncEntities(query) {
    return (dispatch) => {
        // fetch().then(()=>)
        // XHR
        // trae
        dispatch(isLoading(true))
        setTimeout(() => {
            dispatch(isLoading(false))
            dispatch(searchVideo(query))
        }, 5000)
    }

}