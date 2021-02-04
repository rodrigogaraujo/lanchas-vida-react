import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Container, Content, Background, ContentAnimation } from "./styles";
import Button from "../../components/Button";

import logo from "../../assets/logo.png";

const SignUp: React.FC = () => {
    return (
        <Container>
            <Background />
            <Content>
                <ContentAnimation>
                    <img src={logo} alt="LanchasVida" title="LanchasVida" />
                    <h1>Contatos:</h1>

                    <h2>contato@lanchasvida.com.br</h2>
                    <Button type="submit">Cadastrar</Button>
                    <Link to="/">
                        <FiArrowLeft size={20} />
                        Voltar para o logon
                    </Link>
                </ContentAnimation>
            </Content>
        </Container>
    );
};

export default SignUp;
