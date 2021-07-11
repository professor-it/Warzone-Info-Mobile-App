import {ADS_GUN} from '../types'

export const ads = () => {
	return async dispatch => {
		dispatch({
			type: ADS_GUN,
		})
	}
}