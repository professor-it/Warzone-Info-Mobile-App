import {FETCH_POSTS} from '../types'

const initialState = {
	allPosts: [],
	loading: true,
}

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				allPosts: action.payload,
				loading: false
			}
		default: return state
	}
	return state
}