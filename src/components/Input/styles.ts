import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";

interface ContainerProps {
    isFilled: boolean;
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    padding: 16px;
    background: white;
    border: solid 2px #2a4175;
    border-radius: 10px;
    color: #232129;

    display: flex;
    align-items: center;

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${(props) =>
        props.isFocused &&
        css`
            border-color: #232129;
            color: #2a4175;
        `}
    ${(props) =>
        props.isFilled &&
        css`
            color: #232129;
        `}
    

    > svg {
        margin-right: 16px;
    }

   
    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #232129;

        &::placeholder {
            color: #666360;
        }
    }

    & + div {
        margin-top: 8px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
