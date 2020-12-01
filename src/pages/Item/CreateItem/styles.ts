import styled from 'styled-components'
import { Form } from "@unform/web";

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
    flex-direction: column;

    h1 {
        font-size: 17px;
        margin-bottom: 32px;
    }

    h2 {
        font-size: 15px;
        color: red;
    }
`

export const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    align-items: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
`;

export const Item = styled.div`
    flex-basis: 50%;
`;

export const ItemImages = styled.div`
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Cover = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: row;
    align-items: center;
    label {
        display: flex;
        align-items: row;
        align-items: center;
        cursor: pointer;
        span {
            margin-left: 8px;
        }
        input {
            display: none;
        }
    }
`
