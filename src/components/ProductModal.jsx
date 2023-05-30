// React
import { useState, useEffect, useContext, useRef } from "react";
// Libraries
import styled, { createGlobalStyle } from "styled-components";
import { getCharactersById } from "../api";
// Icons 
import { IoClose } from "react-icons/io5";
// Context
import { AppContext } from "../context/AppContext";
// Hooks
import useOnClickOutside from "../hooks/useOnClickOutside";
// Components
import CharactersItem from "./CharactersItem";
import ThreeDotsLoading from "./ThreeDotsLoading";


const GlobalStyle = createGlobalStyle`
    body {
        overflow: ${({$show}) => $show ? 'hidden' : 'auto'};
        &:before {
            opacity: ${({$show}) => $show ? '1' : '0'};
            visibility: ${({$show}) => $show ? 'visible' : 'hidden'};
        }
    }
`;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: var(--clr-bg);
    z-index: 999;
    padding: 2rem;
    overflow-y: auto;

    @media(min-width: 481px){
        width: 90vw;
        max-height: 600px;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
    @media(min-width: 768px){
        width: 90vw;
        top: 5rem;
        left: 50%;
        transform: translate(-50%, 0);
    }

    @media(min-width: 1024px){
        max-width: 900px;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: min-content;
    height: max-content;
    gap: 1rem 2rem;
    padding: 0 2rem;
`;

const CloseBtn = styled.button`
    display: flex;
    padding: .2rem;
    position: sticky;
    top: 0;
    right: 0;
    margin-left: auto;
    font-size: 2rem;
    cursor: pointer;
    margin-bottom: 2rem;
    background-color: var(--clr-text);
    color: var(--clr-white);
    border-radius: 50%;

`;

const NotFound = styled.h4`
    font-size: 1.8rem;
    text-align: center;
`;


export default function ProductModal(){
    const { productModal, closeProductModal } = useContext(AppContext);

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const ref = useRef(null);

    const handleKey = (e) => {
        if(e.key === 'Escape'){
            closeProductModal();
        }
    }

    useEffect(() => {
        getCharactersById(productModal.id).then(data => {
            setCharacters(data);
            setLoading(false);
        });

        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('keydown', handleKey);
        }
    }, []);


    useOnClickOutside(ref, closeProductModal);

    return (
        <>
            <GlobalStyle $show={true}/>
            <Wrapper ref={ref}>
                <CloseBtn onClick={() => closeProductModal()}>
                    <IoClose/>
                </CloseBtn>

     
                {loading ? <ThreeDotsLoading/> : characters.length ? (
                    <List>
                        {characters.map((item, index) => <CharactersItem key={index} {...item}/>)}
                    </List>
                ) : (
                    <NotFound>
                        Characters not found
                    </NotFound>
                )}

            </Wrapper>
        </>

    )
}