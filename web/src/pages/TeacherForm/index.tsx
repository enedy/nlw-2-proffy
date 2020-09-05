import React, { useState, FormEvent } from 'react';

import {useHistory} from "react-router-dom";

import './styles.css';

import warningIcon from "../../assets/images/icons/warning.svg"
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '' }]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function handleCreateClass(e:FormEvent){
    e.preventDefault();

    api.post("/classes", {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule:scheduleItems
    }).then(() => {
      alert("Cadastrado com sucesso!");
      history.push("/");
    }).catch(() => {
      alert("Erro no cadastro!");

    }); 
    
  }

  function setScheduleItemValue(position : number, field: string, value : string){
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(position === index){
        return {...scheduleItem, [field]: value}
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div className="container" id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus Dados</legend>

          <Input
            name="name"
            label="Nome Completo"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />

          <Input
            name="avatar"
            label="Avatar"
            value={avatar}
            onChange={(e) => { setAvatar(e.target.value) }}
          />

          <Input
            name="whatsapp"
            label="WhatsApp"
            value={whatsapp}
            onChange={(e) => { setWhatsapp(e.target.value) }}
          />

          <Textarea
            value={bio}
            onChange={(e) => { setBio(e.target.value) }}
            name="bio"
            label="Biografia"
          />

        </fieldset>

        <fieldset>
          <legend>Sobre a Aula</legend>
          <Select
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
            value={subject}
            onChange={(e) => { setSubject(e.target.value) }}
          />

          <Input

            name="cost"
            label="Custo por Hora"

            value={cost}
            onChange={(e) => { setCost(e.target.value) }}
          />
        </fieldset>

        <fieldset>
          <legend>Horários Disponíveis
          <button type="button" onClick={addNewScheduleItem}>
              + Novo Horário
            </button>
          </legend>
          {scheduleItems.map((scheduleItem, key) => {
            return (
              <div className="schedule-item" key={key}>
                <Select
                  name="week_day"
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={e => {
                    setScheduleItemValue(key, 'week_day', e.target.value)
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
                />

                <Input 
                  name="from" 
                  label="Das" 
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => {
                    setScheduleItemValue(key, 'from', e.target.value)
                  }} 
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => {
                    setScheduleItemValue(key, 'to', e.target.value)
                  }} 
                />

              </div>);
          })}
        </fieldset>

        <footer>

          <p>
            <img src={warningIcon} alt="Aviso Importante" />
            Importante! <br />
            Preencha todos os dados
          </p>

          <button type="submit">Salvar Cadastro</button>
        </footer>

        </form>
      </main>
    </div>
  );
}

export default TeacherForm;