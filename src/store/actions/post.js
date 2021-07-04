import {FETCH_POSTS} from '../types'

export const loadPosts = () => {
	return async dispatch => {
		const res = await fetch('https://warzone-info-default-rtdb.europe-west1.firebasedatabase.app/Posts.json',{
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		const data = await res.json()
		const posts = []
		Object.values(data).forEach((key, index) => {
			posts.push(key)
		})

		dispatch({
			type: FETCH_POSTS,
			payload: posts
		})
	}
}