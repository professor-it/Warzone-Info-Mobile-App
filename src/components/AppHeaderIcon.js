import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import {THEME} from '../theme'

export const AppHeaderIcon = props => (
	<HeaderButton
		{...props}
		iconSize={props.iconSize || 26}
		IconComponent={Ionicons}
		color={props.color || THEME.TEXT_COLOR}
	/>
)