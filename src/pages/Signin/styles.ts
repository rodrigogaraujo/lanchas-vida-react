import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import backgroundImg from "../../assets/lancha2.jpeg";

export const Container = styled.div`
    align-items: stretch;
    display: flex;
    height: 100vh;
`;

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const Content = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 200px;
        height: 200px;
    }

    animation: ${appearFromLeft} 1s;

    form {
        margin: 30px 0;
        max-width: 340px;
        text-align: center;
        width: 100%;

        h1 {
            margin-bottom: 24px;
        }

        a {
            display: block;
            margin-top: 12px;
            color: #2a4175;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, "#2a4175")};
            }
        }
    }

    > a {
        display: block;
        color: #2a4175;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: color 0.2s;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, "#2a4175")};
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center;
    background-size: cover;
`;
