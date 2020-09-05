import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    // como se fosse um ngInit
    //{} - funcao que sera disparada
    // [] - quando será disparada (se preencher com uma variavel, quando a variavel mudar, dispara a função)
    // e quando vazio, dispara uma vez só
    // deixei aqui somente para exemplo
    useEffect(() => {
    }, [])

    useFocusEffect(() => {
        loadFavorites();
    })

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const { data } = await api.get("/classes", {
            params: {
                subject,
                time,
                week_day
            }
        });

        setTeachers(data);
        setIsFiltersVisible(false);
    }

    return (
        <View style={styles.container} >
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )} >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}> Matéria </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor='#c1bccc'
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor='#c1bccc'
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor='#c1bccc'
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {/* {teachers.map(teacher => <TeacherItem />)} */}
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}

            </ScrollView>

        </View>
    );
}

export default TeacherList;