import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../Header/header";
import { User } from "../Users/user";
import { Modal } from "../Modal/modal";
import { cards } from "../Cards/cards"
import { Mask } from "../Mask/mask"
import "../Home/home.css";


export function Home() {
    const [userList, setUserList] = useState([]);
    const [pay, setPay] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [sucessPayment, setSucessPayment] = useState(false);
    const [errorPayment, setErrorPayment] = useState(false);

    //Coletar os dados do do usuário da API e colocar os dados da API
    //(dentro do useEffect) para passar os valores em um array vazio
    //para controlar o hook e não criar um loop na lista
    useEffect(() => {
        axios
            .get("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
            .then((answer) => {
            setUserList(answer.data);
            console.log(answer);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    //Função para ativar o modal de pagamento e setar pagamento para o "userList"
    
    function OnClickButton(user) {
        setPay(user);
        setOpenModal(true);
    }   

    //Validação do valor no input
    //verificar qual o cartão de crédito selecionado
    const creditCardData = async (event) => {
        event.preventDefault();
        

        const formData = new FormData(event.target);
        const value = formData.get("payValue");
        const card = formData.get("selectCard");
        const selectCard = cards.find(
          (cardObject) => cardObject.card_number === card
        );

        //Função para pegar os dados do pagamento (input)
        //e submeter a requisição "POST" conforme o cartão selecionado
        await (
            await fetch(
                "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
                {
                    method: "POST",
                    body: {
                    card_number: card,
                    cvv: selectCard.cvv,
                    expiry_date: selectCard.expiry_date,
                    destination_user_id: pay.id,
                    value: value,
                    },
                }
            )
        ).json();

        //Condicional para verificar se o cartão selecionado for igual ao da API
        //forçando a mensagem de erro ao selecionar o cartão "4111111111111234"
        //se for "true" abre uma mensagem que o pagamento foi realizado
        //se for "false" abre uma mensagem que o pagamento foi recusado
        if (card === "1111111111111111") {
            setSucessPayment(true);
        } else {
            setErrorPayment(true);
        }
        setOpenModal(false);
    };
    

    return (
        <div>
            <Header />

            {
                //Dados de pagamento e seleção do cartão de crédito
                openModal && (
                    <Modal 
                        title='Pagamento para '
                        subtitle={pay.name}
                        closeModal={() =>setOpenModal(false)}>
                        <form onSubmit={creditCardData}>
                            <input
                                name="payValue"
                                type="text"
                                placeholder="R$ 0,00"
                                className="inputValue"
                                onKeyUp={Mask}
                                maxLength={30}
                                
                                required 
                            />
                            <select name="selectCard" className="selectValue">
                                {cards.map((card, id) => {
                                    return (
                                        <option value={card.card_number} key={id}>
                                            Cartão com final {card.card_number.substring(12)}
                                        </option>
                                    );
                                })}
                            </select>
                        

                            <button type="submit" className="button-submit">
                                Pagar
                            </button>
                        </form>
                    </Modal>
                )
            }

            {
                //Listagem de usuários com nome, ID e Username
                userList.map((user) => {
                    return (
                        <User 
                            onClick={() => {
                            OnClickButton(user);
                        }}
                        userImage={user.img}
                        name={user.name}
                        key={user.id}
                        id={user.id}
                        username={user.username}
                        />
                    );
                })
            }

            {
                //Modal de pagamento sucesso no pagamento (true)
                sucessPayment && (
                <Modal
                    title='Recibo de pagamento'
                    closeModal={() => setSucessPayment(false)}>
                    <span className='text-footer'>
                        O pagamento foi concluído com sucesso!
                    </span>
                </Modal>
                )
            }

            {
                //Modal de pagamento erro no pagamento (false)
                errorPayment && (
                    <Modal
                        title='Recibo de pagamento'
                        closeModal={() => setErrorPayment(false)}>
                        <span className='text-footer'>
                            O pagamento <strong className='strong'>não</strong> foi concluído
                            com sucesso!
                        </span>
                </Modal>
                )
            }
        </div>    
    )
}