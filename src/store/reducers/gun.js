import {ADS_GUN} from '../types'

const initialState = {
	gunInfo: [
		{
			title: 'Штурмовые винтовки',
			item: [
				{
					title: 'Modern Warfare (MW)'
				},
				{
					title: 'Cold War (CW)',
					item: [
						{title: 'Krig 6'},
						{title: 'XM4'},
						{
							title: 'AK-47',
							item: [
								{
									title: 'Для ближнего боя'
								},
								{
									title: 'Для дальнего боя'
								},
								{
									title: 'от Recrent',
									item: {
										author: 'Recrent',
										goal: 'используется вторым оружием для ближнего боя',
										img: 'https://i.imgur.com/2q5mXAI.png',
										muzzle: '',
										barrel: '',
										laser: '',
										optic: 'microflex',
										stock: '',
										underbarrel: '',
										ammunition: '',
										rearGrip: '',
										perk: '',
									}
								},
							]
						},
						{title: 'Гроза'},
						{title: 'FFAR-1'},
						{title: 'QBZ-83'},
						{title: 'FARA 83'},
					]
				}
			]
		},
		{
			title: 'Пистолеты-полуметы',
		},
		{
			title: 'Дробовики',
		},
		{
			title: 'Пулеметы',
		},
		{
			title: 'Тактические винтовки',
		},
		{
			title: 'Пехотные винтовки',
		},
		{
			title: 'Снайперские винтовки',
		},
		{
			title: 'Пистолеты акимбо',
		},
	],
	textUI: {
		setup: 'Сборка',
		author: 'Автор',
		goal: 'Предназначение'
	},
	authorSoc: [
		{
			author: 'Recrent',
			youtube: 'https://www.youtube.com/c/RecrentChannel',
			twitch: 'https://www.twitch.tv/recrent',
		}
	],
	modules: {
		muzzle: {
			title: 'Дуло',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		barrel: {
			title: 'Ствол',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		laser: {
			title: 'Лазер',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		optic: {
			title: 'Оптика',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			},

		},
		stock: {
			title: 'Тыльная часть',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		underbarrel: {
			title: 'Подствольная планка',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		ammunition: {
			title: 'Боеприпасы',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		rearGrip: {
			title: 'Задняя ручка',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		},
		perk: {
			title: 'Перк',
			microflex: {
				title: 'Светодиодный "Микрофлекс"',
				img: 'https://i.imgur.com/g9NyUeE.png'
			}
		}
	},
	ads: 0,
	loading: true,
}

export const gunReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADS_GUN:
			if (state.ads < 1) {
				return {
					...state,
					ads: state.ads + 1
				}
			}
			if (state.ads === 1) {
				return {
					...state,
					ads: 0
				}
			}
	}
	return state
}