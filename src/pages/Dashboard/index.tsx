import React, { useCallback, useEffect, useState } from "react";

import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { format } from 'date-fns';

import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile,
    Content,
    Schedule,
    Calendar,
    NextAppointment,
    Section,
    Appointment,
    ConfirmAppointment,
    ButtonCancel,
    SectionButtons,
    SectionTexts,
    ButtonConfirm,
    TextCancel
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
    const [appointmentInDate, setAppointmentInDate] = useState<AppointmentResponse>({} as AppointmentResponse);
    const [allAppointments, setAllAppointments] = useState<AppointmentResponse[]>([]);

    const { signOut, user, token } = useAuth();
    const { addToast } = useToast();

    const handleDateChange = useCallback((day: Date) => {
        setSelectedDate(day)
    }, []);

    const handleCancel = useCallback(async () => {
        try {
            const response = 
                await api.put(`/appointments/cancel`, {
                    appointment_id: appointmentInDate.id
                } ,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
            setAppointmentInDate(response.data);
            addToast({
                type: "success",
                title: "Cancelado com sucesso",
                description:
                    "Aluguel cancelado com sucesso! Realize o estorno no painel do mercado pago.",
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Erro no cancelamento",
                description:
                    "Ocorreu um erro ao fazer o cancelamento, tente novamente mais tarde.",
            });
        }
    }, [appointmentInDate, token, addToast])

    const handleConfirm = useCallback(async () => {
        try {
            const response = 
                await api.put(`/appointments/confirm`, {
                    appointment_id: appointmentInDate.id
                } ,{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
            setAppointmentInDate(response.data);
            addToast({
                type: "success",
                title: "Confirmado com sucesso",
                description:
                    "Aluguel confirmado com sucesso!",
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Erro na confirmação",
                description:
                    "Ocorreu um erro ao fazer a confirmação, tente novamente mais tarde.",
            });
        }
    }, [appointmentInDate, token, addToast])

    useEffect(() => {
        async function getAppointmentByDate() {
            try {
                const response = 
                    await api.get(`/appointments/appointment-date?date=${
                        format(selectedDate, 'yyyy-MM-dd HH:mm:ss')
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
    }, [selectedDate, token])

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
            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>

                    <NextAppointment>
                        <strong>
                            Data selecionada - {format(selectedDate, 'dd/MM/yyyy')}
                        </strong>
                        {appointmentInDate && (
                            <div>
                                {
                                    appointmentInDate.user && appointmentInDate.user.avatar && (
                                        <img src={`https://nodedeploy.lanchasvida.net/files/${appointmentInDate.user.avatar}`}
                                         alt={appointmentInDate.user ? appointmentInDate.user.name : ''} />
                                    )
                                }
                                <SectionTexts>
                                    <strong>
                                        {appointmentInDate.user ? appointmentInDate.user.name : ''}
                                    </strong>
                                    {appointmentInDate.is_canceled 
                                        ? (<TextCancel>Cancelado</TextCancel>)
                                        : (
                                            <section>
                                                <ConfirmAppointment isConfirmed={appointmentInDate.is_confirmed}>
                                                    {appointmentInDate.is_confirmed 
                                                        ? 'Confirmado'
                                                        : 'Aguardando'
                                                    }
                                                </ConfirmAppointment>
                                            </section>
                                        )
                                    }
                                </SectionTexts>
                                {!appointmentInDate.is_canceled && (
                                    <SectionButtons>
                                        <ButtonCancel type="button" onClick={handleCancel}>Cancelar</ButtonCancel>
                                        {!appointmentInDate.is_confirmed && (
                                            <ButtonConfirm type="button" onClick={handleConfirm}>Confirmar</ButtonConfirm>
                                        )}
                                    </SectionButtons>
                                )}
                                <span>
                                    <FiClock /> 
                                    {format(selectedDate, 'dd/MM/yyyy')} - {appointmentInDate.time}</span>
                            </div>
                        )}
                    </NextAppointment>

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
                                        <strong>{appointment.user ? appointment.user.name : ''}</strong>
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
