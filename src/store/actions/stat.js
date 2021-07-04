import {CHANGE_PLATFORM, FETCH_STAT, CHANGE_NICKNAME, CHANGE_LOADING, ERROR_STAT} from '../types'

export const changePlatform = (platform) => {
	return dispatch => {
		dispatch({
			type: CHANGE_PLATFORM,
			payload: platform
		})
	}
}

export const changeBattleNick = (nickname) => {
	const changeNickname = nickname.replace(/#/g, '%23')
	return dispatch => {
		dispatch({
			type: CHANGE_NICKNAME,
			payload: changeNickname
		})
	}
}

export const loadStat = (platform, nickname, press=false) => {
	return async dispatch => {
		dispatch({
			type: CHANGE_LOADING,
			payload: true
		})

		await fetch(`https://api.tracker.gg/api/v2/warzone/standard/profile/${platform}/${nickname}?`,{
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
			.then(data => data.json())
			.then((resJ) => {
				const posts = Object.values(resJ)
				const stats = posts[0].segments[1].stats

				const state = {
					date: {
						title: 'Дата',
						value: posts[0].expiryDate
					},
					kills: {
						title: 'Убийства',
						value: stats.kills.value
					},
					deaths: {
						title: 'Смерти',
						value: stats.deaths.value
					},
					kdRatio: {
						title: 'К/Д',
						value: stats.kdRatio.value
					},
					wins: {
						title: 'Победы',
						value: stats.wins.value
					},
					gamesPlayed: {
						title: 'Матчи',
						value: stats.gamesPlayed.value
					},
					wlRatio: {
						title: 'Винрейн',
						value: `${stats.wlRatio.value}%`
					},
					timePlayed: {
						title: 'Наиграно',
						value: `${Math.floor(stats.timePlayed.value/60/60)} ч.`
					},
					averageLife: {
						title: 'Ср. время жизни',
						value: {
							min: (Math.floor(stats.averageLife.value/60) - ((Math.floor(stats.averageLife.value/60/60))*60)).toString().padStart(2, '0'),
							hours: (Math.floor(stats.averageLife.value/60/60)).toString().padStart(2, '0'),
							sec: (Math.floor(stats.averageLife.value % 60)).toString().padStart(2, '0')
						}
					},
					top5: {
						title: 'Топ 5',
						value: stats.top5.value
					},
					top10: {
						title: 'Топ 10',
						value: stats.top10.value
					},
					top25: {
						title: 'Топ 25',
						value: stats.top25.value
					},
					avgKillsGame: {
						title: 'Убийств за игру',
						value: (stats.kills.value / stats.gamesPlayed.value).toFixed(2)
					},
				}

				dispatch({
					type: FETCH_STAT,
					payload: state
				})
			})
			.catch(() => {
				if (press) {
					dispatch({
						type: ERROR_STAT,
						payload: press
					})
				} else {
					dispatch({
						type: ERROR_STAT,
						payload: press
					})
				}
			})

	}
}