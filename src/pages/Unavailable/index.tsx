/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from "react";

import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker from 'react-day-picker';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import Select from 'react-select'

import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile,
    Content,
    Schedule,
    Calendar,
    Section,
    Appointment,
    ConfirmAppointment,
    Menu
} from './styles'

import logoImg from '../../assets/logo.png'
import { useAuth } from "../../hooks/Auth";
import api from '../../services/api';
import { useToast } from "../../hooks/Toast";

interface User {
    name: string;
    avatar: string;
}

interface AppointmentResponse {
    id: string; 
    date: string;
    user: User;
    time: string;
    is_confirmed: boolean;
    is_canceled: boolean;
}

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allAppointments, setAllAppointments] = useState<AppointmentResponse[]>([]);
    const [motorboats, setMotorboats] = useState<any[]>([]);
    const [selected, setSelected] = useState();

    const { signOut, user, token } = useAuth();
    const { addToast } = useToast();

    const handleDateChange = useCallback((day: Date) => {
        setSelectedDate(day)
    }, []);

    const handleUnavailable = useCallback(async() => {
        try {
            if (selected) {
                await api.post(`/appointments`, {
                    motorboat_id: selected && selected.value ? selected.value : '',
                    user_id: null,
                    date: selectedDate,
                    is_confirmed: true,
                    price: 0,
                    is_changed: false,
                    is_canceled: false,
                    time: ''
                },{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                addToast({
                    type: "success",
                    title: "Confirmado com sucesso",
                    description:
                        "Aluguel confirmado com sucesso!",
                });
            } else {
                addToast({
                    type: "error",
                    title: "Erro",
                    description:
                        "Selecione uma lancha.",
                });
            }
        } catch (err) {
            addToast({
                type: "error",
                title: "Erro",
                description:
                    "Houve um erro, tente novamente.",
            });
        }
    }, [selected, addToast, selectedDate, token])

    useEffect(() => {
        async function getMotorboats() {
            try {
                const response = 
                    await api.get(`/motorboat`);
                setMotorboats(response.data);
                
                if (response && response.data && response.data.length) {
                    let motorArr: any[] = []
                    response.data.map((motor: any) => {
                        const objMotor = {
                            value: motor.id,
                            label: motor.description
                        }
                        motorArr.push(objMotor)
                    })
                    setMotorboats(motorArr)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getMotorboats();
    }, [])

    useEffect(() => {
        async function getAppointments() {
            try {
                const response = 
                    await api.get(`/appointments`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });
                    setAllAppointments(response.data);
            } catch (err) {
                console.log(err)
            }
        }
        getAppointments();
    }, [token])

    const handleSelectedItens = useCallback(e => {
        setSelected(e);
    }, []);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="Lanchas vida" />
                    <Profile>
                        <span>Bem-vindo,</span>
                        <strong>{user.name}</strong>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Menu>
                <Link to="/dashboard">Voltar</Link>
                <Link to="/dashboard/item/createItem">Novo item para aluguel</Link>
                <Link to="/dashboard/item">Listar itens para aluguel</Link>
            </Menu>
            <Content>
                <Schedule>
                    <Select 
                        options={motorboats} 
                        value={selected} 
                        onChange={handleSelectedItens} />
                    <strong>
                        Data selecionada - {format(selectedDate, 'dd/MM/yyyy')}
                    </strong>
                    <button type="button" onClick={handleUnavailable}>Marcar data como livre</button>
                    <Section>
                        <strong>Todos os agendamentos</strong>
                        {allAppointments && allAppointments.length ? allAppointments.map(appointment => (
                            !appointment.is_canceled && (
                                <Appointment key={appointment.id}>
                                    <span><FiClock /> {format(new Date(appointment.date), 'dd/MM/yyyy')} - {appointment.time}</span>
                                    <div>
                                        {appointment.user && appointment.user.avatar && (
                                            <img src={`https://nodedeploy.lanchasvida.net/${appointment.user.avatar}`}
                                            alt={appointment.user.name} />
                                        )}
                                        <strong>{appointment.user ? appointment.user.name : 'Dia indisponível'}</strong>
                                        <ConfirmAppointment isConfirmed={appointment.is_confirmed}>
                                            {appointment.is_confirmed 
                                                ? 'Confirmado'
                                                : 'Aguardando'
                                            }
                                        </ConfirmAppointment>
                                    </div>
                                </Appointment>
                            )
                        )) : ''}
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker 
                        onDayClick={handleDateChange}
                        selectedDays={selectedDate}
                        weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
                        months={[
                            "Janeiro",
                            "Fevereiro",
                            "Março",
                            "Abril",
                            "Maio",
                            "Junho",
                            "Julho",
                            "Agosto",
                            "Setembro",
                            "Outubro",
                            "Novembro",
                            "Dezembro"
                        ]} />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
