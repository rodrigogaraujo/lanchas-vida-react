import styled from 'styled-components'

interface INextAppointment {
    isConfirmed: boolean;
}

export const Container = styled.div`
    background: white;
    color: #000;
    padding-bottom: 36px;
`

export const Header = styled.div`
    padding: 32px 0;
    background: #94c5f5;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        background: transparent;
        border: 0;
        outline: 0;

        svg {
            height: 20px;
            width: 20px;
        }
    }
`

export const Content = styled.div`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`

export const Schedule = styled.div`
    flex: 1;
    margin-right: 80px;

    h1 {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
    }

    span + span {
        margin-left: 8px;
        padding-left: 8px;
        border-left: 1px solid #000;
    }
`

export const NextAppointment = styled.div`
    margin-top: 32px;
    > strong {
        color: #005687;
        font-size: 20px;
        font-weight: 400;
    }

    div {
        min-height: 98px;
        background: #ccc;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-top: 24px; 
        position: relative;

        &::before {
            position: absolute;
            height: 80%;
            width: 1px;
            left: 0;
            top: 10px;
            content: "";
            background: #005687;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        strong {
            color: #005687;
        }

        span {
            margin-left: auto;
            display: flex;
            align-items: center;
            font-size: 14px;
            svg {
                color: #005687;
                margin-right: 8px;
            }
        }
    }
`

export const SectionTexts = styled.section`
    strong {
        margin-left: 0px;
        color: #005687;
    }
`;

export const TextCancel = styled.span`
    color: red;
`;

export const ConfirmAppointment = styled.span<INextAppointment>`
    color: ${props => props.isConfirmed ? 'green' : 'red'};
`;

export const SectionButtons = styled.section`
    margin-left: auto;
`;

export const ButtonCancel = styled.button`
    border: 1px solid red;
    padding: 8px;
    background: red;
    color: white;
    border-radius: 10px;
    margin: 0 8px;
`;

export const ButtonConfirm = styled.button`
    border: 1px solid green;
    padding: 8px;
    background: green;
    color: white;
    border-radius: 10px;
    margin: 0 8px;
`;

export const Section = styled.div`
    margin-top: 48px;

    > strong {
        color: #005687;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #3e3b47;
        display: block;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }
`;

export const Appointment = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    & + div {
        margin-top: 16px;
    }

    span {
        margin-left: auto;
        display: flex;
        align-items: center;

        svg {
            color: #005687;
            margin-right: 8px;
        }
    }

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }
    div {
        flex: 1;
        background: #ccc;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-left: 24px;
    }
    strong {
        margin-left: 24px;
        color: #005687;
    }
`

export const Calendar = styled.div`
    width: 300px;
`
