// React
import { useContext, useEffect } from "react";
// Libraries
import styled from "styled-components";
// Components
import Notify from "./Notify";
// Context
import { AppContext } from "../context/AppContext";



const Wrapper = styled.div`
    position: fixed;
    bottom: 2rem;
    left: 50%;
    z-index: 999;
    max-width: max-content;
    width: 100%;
    transform: translateX(-50%);

    @media(min-width: 360px){
        left: 2rem;
        transform: translateX(0);
        max-width: 260px;
        width: 100%;
    }

    @media(min-width: 481px){
        width: 100%;
        max-width: 320px;
    }
`;


export default function NotifyContainer(){
    const { notifyArray } = useContext(AppContext);

    return (
        <Wrapper>
            {notifyArray.map(item => <Notify key={item.id} {...item}/>)}
        </Wrapper>
    )
}