import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Authors from '../Components/Authors';
import Books from '../Components/Books';
import User from '../Components/User';

const Tab = createBottomTabNavigator();

function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName = "";

					if (route.name === 'Authors') {
						iconName = 'ios-home';
					} else if (route.name === 'Books') {
						iconName = 'ios-book';
					} else if (route.name === 'User') {
						iconName = 'ios-contact'
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				showLabel: false,
				style: {
					elevation: 0,
					shadowOpacity: 0,
					height: 64,
					borderWidth: 0,
					borderTopLeftRadius: 35,
					borderTopRightRadius: 35,
					position: 'absolute',
				},
				tabStyle: {
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					borderTopLeftRadius: 35,
					borderTopRightRadius: 35,
				},
				iconStyle: {
					flex: 0,
					width: 20,
					height: 20,
				},
				labelStyle: {
					fontFamily: 'Archivo_700Bold',
					fontSize: 13,
					marginLeft: 16,
				},
				inactiveBackgroundColor: '#FFF',
				activeBackgroundColor: '#EBEBF5',
				inactiveTintColor: '#C1BCCC',
				activeTintColor: '#32264D',
			}}>
			<Tab.Screen name="Authors" component={Authors} />
			<Tab.Screen name="Books" component={Books} />
			<Tab.Screen name="User" component={User} />
		</Tab.Navigator>
	);
}

export default Tabs;