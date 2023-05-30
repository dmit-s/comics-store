// React
import { useContext } from "react";
// Libraries
import styled from "styled-components";
// Icons
import { TiShoppingCart } from "react-icons/ti";
// Context
import { AppContext } from "../context/AppContext";


const Wrapper = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: var(--clr-gray-light);
    border-radius: 5px;
    padding: .15rem .5rem;
    transition: .2s ease-in-out;
    pointer-events: ${({$disable}) => $disable ? 'none' : 'all'};
    
    &:hover {
        background-color: var(--clr-purple-light);
    }

    & svg {
        font-size: 1.9rem;
        margin-right: .25rem;
    }
`;

export default function AddToBasketBtn({id, recentlyRemoved}){
    const { addToBasket } = useContext(AppContext);

    return (
        <Wrapper $disable={new Set(recentlyRemoved).has(id) ? true : false} onClick={() => addToBasket(id)}>
            <TiShoppingCart/>
            Add To Cart
        </Wrapper>
    )
}