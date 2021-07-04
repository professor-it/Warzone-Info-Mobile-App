import {CHANGE_LOADING, CHANGE_NICKNAME, CHANGE_PLATFORM, FETCH_STAT, ERROR_STAT} from '../types'

const initialState = {
	user: {
		battleNick: '',
		platform: 'battlenet'
	},
	platform: [
		{
			label: 'Battle.net',
			value: 'battlenet'
		},
		{
			label: 'PlayStation Network',
			value: 'psn'
		},
		{
			label: 'Xbox Live',
			value: 'xbl'
		},
	],
	stats: null,
	data: {
		platform: 'Выберете платформу',
		button: 'Найти',
		input: 'Введите ваш никнейм'
	},
	noUser: [
		{text: 'Простите, но такой пользователь не найден.'},
		{text: 'Проверьте правильнось написания вашего ника или платформу.'},
		{text: 'Если всё верно, то откройте доступ к вашему профилю следуя инструкции ниже.'},
	],
	infoProfile: [
		{
			text: 'Обратите внимание! Нужно вводить ник и цифры после # из приложения battle.net (blizzard) либо просто PSN ник, либо просто XBL ник. Но не нужно вводить ник и цифры после # из игры, т.е. из Activision аккаунта. Будьте внимательны!'
		},
	],
	loading: false,
	error: false
}

export const statReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_STAT:

			return {
				...state,
				stats: action.payload,
				loading: false
			}
		case CHANGE_PLATFORM:
			return {
				...state,
				user: {
					...state.user,
					platform: action.payload
				},
			}
		case CHANGE_NICKNAME:
			return {
				...state,
				user: {
					...state.user,
					battleNick: action.payload
				}
			}
		case CHANGE_LOADING:
			return {
				...state,
				loading: action.payload
			}
		case ERROR_STAT:
			return {
				...state,
				error: action.payload,
				stats: null,
				loading: false
			}
		default: return state
	}
	return state
}