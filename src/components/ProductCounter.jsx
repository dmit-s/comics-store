// React
import { useContext } from "react";
// Libraries
import styled from "styled-components";
// Icons
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
// Context
import { AppContext } from "../context/AppContext";

const Wrapper = styled.div`
    pointer-events: ${({$disable}) => $disable ? 'none' : 'all'};
    display: flex;
    align-items: center;
`;
const ValueContainer = styled.span`
    font-weight: var(--fw-bold);
    font-size: 1.3rem;
    margin: 0 .5rem;
`;
const Btn = styled.button`
    display: flex;
    cursor: pointer;
    & svg {
        font-size: 1.8rem;
    }
`;

export default function ProductCounter({id, recentlyRemoved, setBasketRenderData}){
    const { basketComics, increaseCounter, decreaseCounter } = useContext(AppContext); 

    const findProduct = basketComics.find(p => p.id === id);

    return (
        <Wrapper $disable={new Set(recentlyRemoved).has(id) ? true : false}>
            <Btn onClick={() => decreaseCounter(id, setBasketRenderData)}>
                <AiFillMinusCircle/>
            </Btn>
            <ValueContainer>
                {findProduct.amount}
            </ValueContainer>
            <Btn onClick={() => increaseCounter(id)}>
                <AiFillPlusCircle/>
            </Btn>
        </Wrapper>
    )
}