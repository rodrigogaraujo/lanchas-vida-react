import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Container, Content, Background, ContentAnimation } from "./styles";

import logo from "../../assets/logo.png";

const SignUp: React.FC = () => {
    return (
        <Container>
            <Background />
            <Content>
                <ContentAnimation>
                    <img src={logo} alt="LanchasVida" title="LanchasVida" />
                    <h1>Contatos:</h1>

                    <p>O Contrato aceito no aplicativo constite o acordo integral e plenamente vinculante entre a LANCHAS VIDA e o LOCATÓRIO, sendo o único documento a reger sua relação contratual, substituindo todos e quaisquer acordos e entendimentos, verbais ou escritos, mantidos anteriormente entre os mesmos.</p>
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
