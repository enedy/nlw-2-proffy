import React, { useState, FormEvent } from 'react';


import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


import './styles.css';
import api from '../../services/api';

const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [weekDay, setWeekDay] = useState("");

    async function handleSearch(e: FormEvent) {
        e.preventDefault();

        const { data } = await api.get("/classes", {
            params: {
                subject,
                time,
                week_day: weekDay
            }
        });

        setTeachers(data);
    }

    return (
        <div className="container" id="page-teacher-list">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={handleSearch}>
                    <Select
                        value={subject}
                        onChange={e => {
                            setSubject(e.target.value);
                        }}
                        options={[
                            { value: "Matemática", label: "Matemática" },
                            { value: "Física", label: "Física" },
                            { value: "Química", label: "Química" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Português", label: "Português" },
                            { value: "Redação", label: "Redação" },
                            { value: "Geografia", label: "Geografia" },
                            { value: "História", label: "História" },
                            { value: "Filosofia", label: "Filosofia" }

                        ]}
                        name="subject"
                        label="Matéria"
                    />
                    <Select

                        value={weekDay}
                        onChange={e => {
                            setWeekDay(e.target.value);
                        }}
                        options={[
                            { value: "0", label: "Domingo" },
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" },

                        ]}
                        name="week_day"
                        label="Dia da Semana"
                    />

                    <Input
                        value={time}
                        onChange={e => {
                            setTime(e.target.value);
                        }}
                        label="Hora"
                        type="time"
                        name="time"
                    />

                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher:Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                        />
                    );
                })}

                

            </main>
        </div>
    );
}

export default TeacherList;