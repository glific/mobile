import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface Route {
	title: string;
}

interface TabBarProps {
	routes: Route[];
	index: number;
	setIndex: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ routes, index, setIndex }) => {
	const id = index;
	return (
		<View style={styles.container}>
			{routes.map((route, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={route.title === routes[id]?.title ? styles.currentTab : styles.tab}
						onPress={() => {
							setIndex(index);
						}}
					>
						<Animated.Text style={{ fontSize: 18 }}>{route.title}</Animated.Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderColor: '#ccc',
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderWidth: 1,
		flexDirection: 'row',
		height: 50,
		justifyContent: 'space-around',
	},
	currentTab: {
		alignItems: 'center',
		borderBottomColor: '#49d52a',
		borderBottomWidth: 2,
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 5,
	},
	tab: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 5,
	},
});

export default TabBar;
