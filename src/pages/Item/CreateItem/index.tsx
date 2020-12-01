import React, { useCallback, useState, useRef, ChangeEvent, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { FiPower, FiLock, FiList, FiDollarSign, FiCamera } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';
// import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile,
    Content,
    StyledForm,
    Item,
    Cover,
    ItemImages
} from './styles'

import logoImg from '../../../assets/logo.png'
import api from '../../../services/api';
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { useAuth } from "../../../hooks/Auth";
import { useToast } from "../../../hooks/Toast";
import getValidationErros from "../../../utils/getValidationErros";

interface ICreateItem {
    description: string;
    price: number;
    capacity: string;
    kitchen: string;
    bathroom: string;
    masterBedroom: string;
    guestRoom: string;
    eletric: string;
    details: string;
    recreation: string;
}

const CreateItem: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [cover, setCover] = useState<any>();
    const [imageOne, setImageOne] = useState<any>();
    const [imageTwo, setImageTwo] = useState<any>();
    const [imageThree, setImageThree] = useState<any>();
    const [imageFour, setImageFour] = useState<any>();
    const [imageFive, setImageFive] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');

    const { signOut, user, token } = useAuth();
    const { addToast } = useToast();

    const handleCoverSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setCover(e.target.files[0])
        }
    }, []);

    const handleImageOne = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setImageOne(e.target.files[0])
        }
    }, []);

    const handleImageTwo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setImageTwo(e.target.files[0])
        }
    }, []);

    const handleImageThree = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setImageThree(e.target.files[0])
        }
    }, []);

    const handleImageFour = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setImageFour(e.target.files[0])
        }
    }, []);

    const handleImageFive = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setImageFive(e.target.files[0])
        }
    }, []);

    const handleSubmit = useCallback(
        async (data: ICreateItem) => {
            try {
                if (!id) {
                    if (!cover || !imageOne) {
                        addToast({
                            type: "error",
                            title: "Selecione uma foto para cover e uma para detalhes",
                            description:
                                "Ocorreu um erro, pois o cover é obrigatório",
                        });
                        return;
                    }
                    const schema = Yup.object().shape({
                        description: Yup.string()
                            .required("Digite a descrição"),
                        price: Yup.number().required("Digite um preço"),
                    });
                    await schema.validate(data, {
                        abortEarly: false,
                    });
                    setLoading(true);
                    
                    const response = 
                        await api.post('/motorboat', { ...data }, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
                    if (response.data) {
                        try{
                            const formData = new FormData()
                            formData.append('pictureFilename', cover)
                            formData.append('motorboat_id', response.data.id)
                            const responseNew = 
                                await api.patch('/motorboat/picture', formData, {
                                    headers: {
                                        authorization: `Bearer ${token}`
                                    }
                                });
                            if (responseNew.data) {
                                const formDataImgOne = new FormData()
                                formDataImgOne.append('pictureFilename', imageOne)
                                formDataImgOne.append('motorboat_id', response.data.id)
                                await api.patch('/motorboat/pictures', formDataImgOne, {
                                    headers: {
                                        authorization: `Bearer ${token}`
                                    }
                                });
                                if (imageTwo) {
                                    const formDataImgTwo = new FormData()
                                    formDataImgTwo.append('pictureFilename', imageTwo)
                                    formDataImgTwo.append('motorboat_id', response.data.id)
                                    await api.patch('/motorboat/pictures', formDataImgTwo, {
                                        headers: {
                                            authorization: `Bearer ${token}`
                                        }
                                    });
                                }
                                if (imageThree) {
                                    const formDataImgThree = new FormData()
                                    formDataImgThree.append('pictureFilename', imageThree)
                                    formDataImgThree.append('motorboat_id', response.data.id)
                                    await api.patch('/motorboat/pictures', formDataImgThree, {
                                        headers: {
                                            authorization: `Bearer ${token}`
                                        }
                                    });
                                }
                                if (imageFour) {
                                    const formDataImgFour = new FormData()
                                    formDataImgFour.append('pictureFilename', imageFour)
                                    formDataImgFour.append('motorboat_id', response.data.id)
                                    await api.patch('/motorboat/pictures', formDataImgFour, {
                                        headers: {
                                            authorization: `Bearer ${token}`
                                        }
                                    });
                                }
                                if (imageFive) {
                                    const formDataImgFive = new FormData()
                                    formDataImgFive.append('pictureFilename', imageFive)
                                    formDataImgFive.append('motorboat_id', response.data.id)
                                    await api.patch('/motorboat/pictures', formDataImgFive, {
                                        headers: {
                                            authorization: `Bearer ${token}`
                                        }
                                    });
                                }
                                addToast({
                                    type: "success",
                                    title: "Item adicionado",
                                    description:
                                        "Item adicionado com sucesso!",
                                });
                            }
                        
                        } catch (err) {
                            // pending: delete idtem
                            setLoading(false)
                            console.log(err)
                        }
                    }
                    setCover(null)
                    setImageOne(null)
                    setImageTwo(null)
                    setImageThree(null)
                    setImageFour(null)
                    setImageFive(null)
                    setLoading(false)
                }
            } catch (err) {
                setLoading(false)
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
        [addToast, cover, token, imageOne, imageTwo, imageThree, imageFour, imageFive, id],
    );

    useEffect(() => {
        if (history && history.location.pathname.split('/dashboard/item/edit/')[1]) {
            setId(history.location.pathname.split('/dashboard/item/edit/')[1])
        }
    }, [history])

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
                {loading ? 'Carregando...' : (
                    <>
                        <h1>Cadastre um novo item para aluguel</h1>
                        <h2>Itens com cadeado, separe a tag (detalhe) por uma vírgula. Ex: Pia, Chuveiro, Sanitário elétrico </h2>
                        <StyledForm onSubmit={handleSubmit} ref={formRef}>
                            <Item>
                                <Input 
                                    name="description" 
                                    icon={FiList} 
                                    placeholder="Descrição/nome" />
                            </Item>
                            <Item>
                                <Input
                                    name="price"
                                    type="number"
                                    icon={FiDollarSign}
                                    placeholder="Preço"
                                />
                            </Item>
                            <Item>
                                <Input
                                    name="capacity"
                                    icon={FiList}
                                    placeholder="Capacidade"
                                />
                                <Item>
        
                            </Item>
                                <Input
                                    name="kitchen"
                                    icon={FiLock}
                                    placeholder="Cozinha"
                                />
                                <Item>
        
                            </Item>
                                <Input
                                    name="bathroom"
                                    icon={FiLock}
                                    placeholder="Banheiro"
                                />
                                <Item>
        
                            </Item>
                                <Input
                                    name="masterBedroom"
                                    type="numeric"
                                    icon={FiLock}
                                    placeholder="Quarto principal"
                                />
                            </Item>
                            <Item>
                                <Input
                                    name="guestRoom"
                                    icon={FiLock}
                                    placeholder="Quarto de hóspedes"
                                />
                            <Item>
        
                            </Item>
                                <Input
                                    name="eletric"
                                    icon={FiLock}
                                    placeholder="Eletrica"
                                />
                            <Item>
        
                            </Item>
                                <Input
                                    name="details"
                                    icon={FiLock}
                                    placeholder="Detalhes"
                                />
                            <Item>
        
                            </Item>
                                <Input
                                    name="recreation"
                                    icon={FiLock}
                                    placeholder="Lazer"
                                />
                            </Item>
                            <Item>
                                <Cover>
                                    <label htmlFor="avatar">
                                        <FiCamera size="40" />
                                        <span>Cover {cover ? `: ${cover.name}` : ''}</span>
                                        <input type="file" id="avatar" onChange={handleCoverSelect}></input>
                                    </label>
                                </Cover>
                            </Item>
                            <ItemImages>
                                <Item>
                                    <Cover>
                                        <label htmlFor="imgOne">
                                            <FiCamera size="40" />
                                            <span>Img 01 {imageOne ? `: ${imageOne.name}` : ''}</span>
                                            <input type="file" id="imgOne" onChange={handleImageOne}></input>
                                        </label>
                                    </Cover>
                                </Item>
                                <Item>
                                    <Cover>
                                        <label htmlFor="imgTwo">
                                            <FiCamera size="40" />
                                            <span>Img 02 {imageTwo ? `: ${imageTwo.name}` : ''}</span>
                                            <input type="file" id="imgTwo" onChange={handleImageTwo}></input>
                                        </label>
                                    </Cover>
                                </Item>
                                <Item>
                                    <Cover>
                                        <label htmlFor="imgThree">
                                            <FiCamera size="40" />
                                            <span>Img 03 {imageThree ? `: ${imageThree.name}` : ''}</span>
                                            <input type="file" id="imgThree" onChange={handleImageThree}></input>
                                        </label>
                                    </Cover>
                                </Item>
                                <Item>
                                    <Cover>
                                        <label htmlFor="imgFour">
                                            <FiCamera size="40" />
                                            <span>Img 04 {imageFour ? `: ${imageFour.name}` : ''}</span>
                                            <input type="file" id="imgFour" onChange={handleImageFour}></input>
                                        </label>
                                    </Cover>
                                </Item>
                                <Item>
                                    <Cover>
                                        <label htmlFor="imgFive">
                                            <FiCamera size="40" />
                                            <span>Img 05 {imageFive ? `: ${imageFive.name}` : ''}</span>
                                            <input type="file" id="imgFive" onChange={handleImageFive}></input>
                                        </label>
                                    </Cover>
                                </Item>
                            </ItemImages>
                            <Button type="submit">Cadastrar</Button>
                            <Link 
                                to="/dashboard/item">
                                Cancelar
                            </Link>
                        </StyledForm>
                    </>
                )}
            </Content>
        </Container>
    );
};

export default CreateItem;
