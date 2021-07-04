import React from 'react'
import {View, StyleSheet, ImageBackground, Text, TouchableOpacity} from 'react-native'
import {THEME} from '../theme'

export const Post = ({post, onOpen}) => {
const formatDate = (date) => {
	const dd = new Date(date)
	let diff = new Date() - dd;

	let sec = Math.floor(diff / 1000);

	if (sec < 60) {
		return sec + ' сек. назад';
	}

	let min = Math.floor(diff / 60000);
	if (min < 60) {
		return min + ' мин. назад';
	}

	let d = dd;
	d = [
		'0' + d.getDate(),
		'0' + (d.getMonth() + 1),
		'' + d.getFullYear(),
	].map(component => component.slice(-2));

	return d.slice(0, 3).join('.');
}

return (
	<TouchableOpacity activeOpacity={0.95} onPress={() => onOpen(post)}>
		<View style={styles.post}>
			<ImageBackground
				style={styles.img}
				source={{uri: post.img}}
			>
				<View style={styles.textDate}>
					<Text style={styles.date}>
						{formatDate(post.date)}
					</Text>
				</View>
				<View style={styles.textTitle}>
					<Text style={styles.title}>
						{post.text}
					</Text>
					<Text style={styles.desc}>
						{post.desc}
					</Text>
				</View>
			</ImageBackground>
		</View>
	</TouchableOpacity>
)
}

const styles = StyleSheet.create({
	post: {
		marginVertical: 15,
		overflow: 'hidden',
		borderRadius: 10,
		marginHorizontal: 5,
		height: 400,
		borderWidth: 1,
		borderColor: THEME.BORDER_COLOR,
	},
	img: {
		flex: 1,
	},
	textDate: {
		backgroundColor: '#000',
		marginTop: 45,
		paddingVertical: 5,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		alignItems: 'center',
		width: '40%',
	},
	date: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: 11,
		letterSpacing: 1
	},
	textTitle: {
		marginTop: 'auto',
		backgroundColor: 'rgba(0,0,0,0.95)',
		paddingVertical: 15,
		paddingHorizontal: 15,
	},
	title: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: 18,
		textShadowColor: '#000',
		textShadowRadius: 10,
	},
	desc: {
		color: '#999',
		fontFamily: 'open-regular',
		fontSize: 11,
		letterSpacing: 1,
		marginTop: 5,
		textShadowColor: '#000',
		textShadowRadius: 5,
	}
})