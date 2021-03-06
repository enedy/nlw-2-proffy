import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function Favorites() {

    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            console.log(response);
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        });
    }

  
    // executa toda vez que a tela entrar em foco (mudou de aba)
    useFocusEffect(() => {
        loadFavorites();
    })

    return (
        <View style={styles.container} >
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;