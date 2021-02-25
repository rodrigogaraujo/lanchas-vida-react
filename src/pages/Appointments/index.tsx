import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiClock, FiPower } from 'react-icons/fi';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'


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
    Row,
    Menu
} from './styles'

import logoImg from '../../assets/logo.png'
import { useAuth } from "../../hooks/Auth";
import api from '../../services/api';

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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [appointmentInDate, setAppointmentInDate] = useState<AppointmentResponse[]>([]);
    const [allAppointments, setAllAppointments] = useState<AppointmentResponse[]>([]);

    const { signOut, user, token } = useAuth();

    useEffect(() => {
        async function getAppointmentByDate() {
            try {
                const response = 
                    await api.get(`/appointments/appointment-between?dateStart=${
                        format(startDate, 'yyyy-MM-dd HH:mm:ss')
                    }&dateEnd=${
                        format(endDate, 'yyyy-MM-dd HH:mm:ss')
                    }`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });
                    setAppointmentInDate(response.data);
            } catch (err) {
                console.log(err)
            }
        }
        getAppointmentByDate();
    }, [startDate, token, endDate])

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
                <Link to="/dashboard/unavailable">Marcar data como não disponível</Link>
            </Menu>
            <Calendar>
                <Row>
                    <strong>Inicio</strong>
                    <DatePicker
                        dateFormat="dd/MM/yyyy" 
                        selected={startDate} 
                        onChange={(date: any) => setStartDate(date)} />
                </Row>
                <Row>
                    <strong>Fim</strong>
                    <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={endDate} 
                        onChange={(date: any) => setEndDate(date)} />
                </Row>
            </Calendar>
            <Content>
                <Schedule>
                    <Section>
                        <strong>Todos os agendamentos no período selecionado</strong>
                        {appointmentInDate && appointmentInDate.length ? appointmentInDate.map(appointment => (
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
            </Content>
            <Content>
                <Schedule>
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
            </Content>
        </Container>
    );
};

export default Dashboard;
