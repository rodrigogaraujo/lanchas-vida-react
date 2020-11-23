import React, { useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { Container, Content, Background } from "./styles";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";

import getValidationErros from "../../utils/getValidationErros";

import logo from "../../assets/logo.png";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required("Digite seu email")
                        .email("Digite um email válido"),
                    password: Yup.string().required("Digite sua senha"),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({ email: data.email, password: data.password });
                history.push("/dashboard");
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
        [signIn, addToast, history],
    );
    return (
        <Container>
            <Content>
                <img src={logo} alt="LanchasVida" title="LanchasVida" />
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <Link to="/signup">
                    <FiLogIn />
                    Criar conta
                </Link>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
