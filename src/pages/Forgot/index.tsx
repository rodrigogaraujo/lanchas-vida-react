import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { Container, Content, Background } from "./styles";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { useToast } from "../../hooks/Toast";

import getValidationErros from "../../utils/getValidationErros";

import logo from "../../assets/logo.png";

interface ForgotFormData {
    email: string;
}

const Forgot: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: ForgotFormData) => {
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required("Digite seu email")
                        .email("Digite um email válido"),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);
                    formRef.current?.setErrors(erros);
                    return;
                }

                addToast({
                    type: "error",
                    title: "Erro na autenticação",
                    description:
                        "Ocorreu um erro ao fazer login, cheque as credenciais",
                });
            }
        },
        [addToast],
    );
    return (
        <Container>
            <Content>
                <img src={logo} alt="LanchasVida" title="LanchasVida" />
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <h1>Recuperar senha</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Button type="submit">Recuperar</Button>

                </Form>

                <Link to="/">
                    <FiLogIn />
                    Voltar para login
                </Link>
            </Content>
            <Background />
        </Container>
    );
};

export default Forgot;
