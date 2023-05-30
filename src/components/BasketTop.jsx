// React
import { useContext } from "react";
// Libraries
import styled from "styled-components";
// Context
import { AppContext } from "../context/AppContext";


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1.5rem;
    background-color: var(--clr-purple-light);
    border-radius: 5px;
    margin-bottom: 5rem;
`;
const BasketAmount = styled.div`
    font-size: 1.1rem;

`;
const BasketAmountValue = styled.span`
    font-weight: var(--fw-bold);
    font-size: 1.2rem;
    color: var(--clr-purple);
`;
const ClearBasket = styled.button`
    padding: .25rem 0;
    font-size: 1.1rem;    
    cursor: pointer;
    transition: .3s;

    &:hover{
        color: var(--clr-red);
    }
`;


export default function BasketTop({setBasketRenderData}){
    const { basketComics, removeAllFromBasket } = useContext(AppContext);

    const clickToRemoveAllFunc = () => {
        removeAllFromBasket();
        setBasketRenderData([]);
        
    }

    return (
        <Wrapper>
            <BasketAmount>
                Basket: <BasketAmountValue>{basketComics.reduce((acc, value) => acc + value.amount, 0)}</BasketAmountValue>
            </BasketAmount>
            <ClearBasket onClick={clickToRemoveAllFunc}>
                Remove all
            </ClearBasket>
        </Wrapper>
    )
}