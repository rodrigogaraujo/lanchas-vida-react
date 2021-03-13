import React, { useEffect, useState, } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { Link, useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiPower } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';
// import { Form } from "@unform/web";

import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile,
    Content,
    ContentHeader
} from './styles'

import logoImg from '../../assets/logo.png'
import api from '../../services/api';

import { useAuth } from "../../hooks/Auth";
// import { useToast } from "../../hooks/Toast";
import icons from "../../utils/icons";

const columns = [
    {
        title: "Nome",
        field: "description",
    },
    {
        title: "Preço",
        field: "price",
        width: 40,
    },
];


const localization = {
    header: {
        actions: "",
    },
    toolbar: {
        searchPlaceholder: "Pesquisar",
        searchTooltip: "Pesquisar",
    },
    pagination: {
        labelDisplayedRows: "{from}-{to} de {count}",
        labelRowsSelect: "por pagina",
        labelRowsPerPage: "registros por pagina",
        firstTooltip: "Primeira Página",
        previousTooltip: "Página Anterior",
        nextTooltip: "Próxima Página",
        lastTooltip: "Última Página",
    },
};

const CreateItem: React.FC = () => {
    const history = useHistory();

    const { signOut, user, token } = useAuth();
    // const { addToast } = useToast();

    // const [loading, setLoading] = useState(false);
    const [itens, setItens] = useState([]);

    useEffect(() => {
        async function getItens() {
            // setLoading(true);
            const response = await api.get("/motorboat", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItens(response.data);
        }
        getItens();
        // setLoading(false);
    }, [token]);

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
                <ContentHeader>
                    <Link to="/dashboard/item/createItem">Novo item</Link>
                    <h2>Lista de itens para aluguel</h2>
                </ContentHeader>
                <MaterialTable
                        icons={icons}
                        columns={columns}
                        data={itens ? itens : []}
                        title="Usuários"
                        localization={localization}
                        actions={[
                            {
                                icon: () => <FiEdit />,
                                tooltip: "Editar",
                                onClick: (event, rowData: any) => {
                                    history.push(`/dashboard/item/edit/${rowData.id}`)
                                },
                            },
                            {
                                icon: () => <AiOutlineDelete />,
                                tooltip: "Deletar",
                                onClick: (event, rowData) => {},
                            },
                        ]}
                        options={{
                            actionsColumnIndex: 3,
                            showTitle: false,
                            pageSize: 8,
                        }}
                        components={{
                            Toolbar: (props) => (
                                <div style={{ display: "flex" }}>
                                    <div
                                        style={{ 
                                            display: "flex",
                                            flexBasis: "50%",
                                            alignItems: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        <h3>Usuários</h3>
                                    </div>
                                    <div
                                        style={{
                                            flexBasis: "50%",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <MTableToolbar {...props} />
                                    </div>
                                </div>
                            ),
                        }}
                    />
            </Content>
        </Container>
    );
};

export default CreateItem;
