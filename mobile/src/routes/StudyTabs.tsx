import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0, // remove sombra no android
                    shadownOpacity: 0, // remove sombra do ios
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                // cor de fundo da aba quando ela nao esta selecionada
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5', // aba ativa cor
                inactiveTintColor: '#c1cbcc', // cor do texto quando nao selecionado
                activeTintColor: '#32264d' // cor do texto quando selecionado
            }}
        >
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
                        )
                    }
                }}
            />
            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favotiros',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
                        )
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;