import React from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Dimensions,
} from "react-native";

const TabBar = ({ routes,index, setIndex }) => {
	const id=index;
	return (
		<View style={styles.container}>
			{routes.map((route, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={route.title==routes[id]?.title ? styles.Currenttab:styles.tab}
						onPress={() => {setIndex(index)}}
					>
						<Animated.Text style={{fontSize: 18}}>
							{route.title}
						</Animated.Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: '#ccc'
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 5
	},
	Currenttab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 5,
        borderBottomColor:"#49d52a",
		borderBottomWidth:2,
	}
});

export default TabBar;
