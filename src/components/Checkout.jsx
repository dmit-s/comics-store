// React
import { useState, useContext } from "react";
// Icons
import { IoSync } from "react-icons/io5";
// Styled
import styled, { keyframes } from "styled-components";
// Context
import { AppContext } from "../context/AppContext";
// Animations
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;


const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    margin-top: 5rem;
    background-color: var(--clr-purple-light);
    border-radius: 8px;
    & > *:not(:last-child){        
        margin-bottom: 1rem;

        @media(min-width: 360px){
            margin: 0;
        }
    }

    & > *{
        font-size: 1.2rem;
    }

    @media(min-width: 360px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        gap: 2rem 0;
    }

    @media(min-width: 481px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media(min-width: 1280px){
        position: sticky;
        top: 60px;
        display: flex;
        max-width: 320px;
        width: 100%;
        margin: 0;
    }
`;
const ProductAmount = styled.div``;
const ProductAmountValue = styled.span`
    font-weight: var(--fw-bold);
    font-size: 1.4rem;
`;
const TotalPrice = styled.div``;
const TotalPriceValue = styled.span`
    font-weight: var(--fw-bold);
    font-size: 1.4rem;
    color: var(--clr-green);
`;
const CheckoutBtn = styled.button`
    position: relative;
    display: flex;
    align-item: center;
    justify-content: center;
    padding: .5rem 1rem;
    min-width: 6rem;
    margin-top: .5rem;
    background-color: var(--clr-text);
    box-shadow: 0 0 5px var(--clr-purple);
    border-radius: 5px;
    color: var(--clr-white);
    cursor: pointer;
    transition: .2s; 
    pointer-events: ${({$pending}) => $pending ? 'none' : 'all'};
    
    svg{
        font-size: 1.4rem;
    }

    &:hover{
        color: var(--clr-text);
        background-color: var(--clr-white);
    }

    @media(min-width: 360px){
        margin: 0;
        grid-column: 2 span;
    }
    @media(min-width: 481px){
        grid-column: 3 / -1;
    }

    @media(min-width: 1280px){
        grid-template-columns: repeat(2, 1fr);
        grid-column: 2 span;
    }
`;
const AnimatedIoSync = styled(IoSync)`
    animation: ${rotate} 2s linear infinite;
`

export default function Checkout( {basketRenderData} ){
    const { basketComics, addNotify } = useContext(AppContext);

    const [pending, setPending] = useState(false);

    const getTotal = () => {
        return Number(basketComics.map(item => {
            const findProduct = basketRenderData.find(data => data.id === item.id);

            if(findProduct){
                return Number(findProduct.prices[0].price * item.amount);
            }
        }).reduce((acc, value) => acc + value, 0).toFixed(2));
    }

    const getProductsAmount = () => {
        return basketComics.reduce((acc, value) => acc + value.amount, 0)
    }

    const checkout = async (e) => {
        e.preventDefault();

        if(getTotal() === 0){
            return addNotify('Total must be greater than zero', 'error');
        }

        setPending(true);

        fetch(`${import.meta.env.VITE_SERVER_URL}checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: basketRenderData.map(dataItem => {
                    const findItem = basketComics.find(basketItem => basketItem.id === dataItem.id);

                    if(findItem){
                        return {
                            name: dataItem.title,
                            price: Math.ceil(dataItem.prices[0].price) * 100,
                            amount: findItem.amount
                        }
                    }

                })
            })
        }).then(res => {
            setPending(false);
            if(res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }).then(res => {
            window.location.assign(res.url);
        }).catch(e => {
            console.error(e.error);
            setPending(false);
            addNotify('Something went wrong', 'error');
        })
    }


    return (
        <Wrapper onSubmit={checkout}>
            <ProductAmount>
                Products: <ProductAmountValue>{getProductsAmount()}</ProductAmountValue>
            </ProductAmount>
            <TotalPrice>  
                Total: <TotalPriceValue>{getTotal()} $</TotalPriceValue>                              
            </TotalPrice>
            <CheckoutBtn $pending={pending}>
                {pending ? <AnimatedIoSync/> : 'Checkout'}
            </CheckoutBtn>
        </Wrapper>
    )
}