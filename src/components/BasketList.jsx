// React
import { useEffect } from "react";
// Libraries
import styled from "styled-components";
// Components
import BasketListItem from "./BasketListItem";

const Wrapper = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 auto;
`;

export default function BasketList({basketRenderData, setBasketRenderData}){

    return (
        <Wrapper>
            {basketRenderData && basketRenderData.map(item => <BasketListItem key={item.id} {...item} setBasketRenderData={setBasketRenderData}/>)}
        </Wrapper>
    )
}