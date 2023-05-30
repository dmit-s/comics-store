// React
import { useState, useEffect, useRef, useContext } from "react";
// Libraries
import styled from "styled-components";
// Context
import { AppContext } from "../context/AppContext";


const Wrapper = styled.ul`
    display ${({$show}) => $show ? 'block' : 'none'};
    padding: .5rem;
    position: absolute;
    top: 45px;
    z-index: 999;
    width: 100%;
    background-color: var(--clr-white);
    overflow-y: auto;
    max-height: 200px;
    border-radius: 5px;
    box-shadow: 0px 2px 8px 0px rgba(29, 16, 39, 0.5);
`;
const Item = styled.li.attrs({tabIndex: 0})`
    padding: .5rem;
    cursor: pointer;
    background-color: ${({$active}) => $active ? 'var(--clr-purple-light)' : ''};
    transition: .3s;
    &:hover{
        background-color: var(--clr-purple-light);
        
    }
`;


export default function SearchSuggestions(props){
    const {searchValue, suggestions, showSuggList, toggleSuggList, addToRefs, refs, setShowSuggList} = props;

    const { showProductModal } = useContext(AppContext);

    const [focusIndex, setFocusIndex] = useState(-1);
    const [isMouseEvent, setMouseEvent] = useState(false);

    const suggRefs = useRef([]);
    
    const changeFocusIndex = (e) => {
        switch(e.keyCode){
            case 38:
                e.preventDefault();
                setFocusIndex((prevState) => prevState <= 0 ? prevState : prevState - 1);
                break;
            case 40:
                e.preventDefault();
                setFocusIndex((prevState) => prevState === suggestions.length - 1 ? prevState : prevState + 1);
                break;
        }
    }
    const setFocusSuggEl = () => {
        if(isMouseEvent) return setMouseEvent(false);

        if(focusIndex > -1){
            if(suggRefs.current[focusIndex].offsetTop > refs.current[1].offsetHeight){
                refs.current[1].scrollTop = suggRefs.current[focusIndex].offsetTop;
            } else{
                refs.current[1].scrollTop = 0;
            }
        }
    }
    const handleMouseMove = (index) => {
        setMouseEvent(true);
        setFocusIndex(index);
    }
    const addToSuggRefs = (el) => {
        if(!el || suggRefs.current.includes(el)) return;
        suggRefs.current.push(el);
    }

    useEffect(() => {     
        setFocusSuggEl();
    }, [focusIndex])

    useEffect(() => {      
        window.addEventListener('keydown', changeFocusIndex);
        return () => {
            window.removeEventListener('keydown', changeFocusIndex);
        }
    }, [showSuggList, suggestions])

    useEffect(() => {
        suggRefs.current = [];
        setFocusIndex(-1);
        toggleSuggList();
    }, [suggestions])

    return (
        <Wrapper ref={(el) => addToRefs(el)} $show={showSuggList}>
            {searchValue.trim().length > 2 && /[a-zA-Z]+/g.test(searchValue) ? (
                suggestions.map((s, index) => (
                    <Item ref={(el) => {addToSuggRefs(el); addToRefs(el)}} $active={index === focusIndex} onClick={() => showProductModal(s.id)} onMouseMove={() => handleMouseMove(index)} key={s.id}>{s.title}</Item>
                ))
            ) : ''}
        </Wrapper>
    )
}