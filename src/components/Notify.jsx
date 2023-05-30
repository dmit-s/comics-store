// Libraries
import styled, { keyframes } from "styled-components";
// Icons
import { BiErrorAlt, BiCheckCircle } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const appearance = keyframes`
    from {
        transform: translateX(-200%);
    } to {
        transform: translateX(0);
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--clr-gray-light);
    box-shadow: 0px 0px 8px 0px rgba(20, 34, 45, 0.8);
    &:not(:last-child){
        margin-bottom: 1rem;
    }
    padding: 1.5rem 1rem;   

    & > svg:first-child{
        margin-right: .5rem;
        font-size: 2rem;
    }
    transition: .8s;
    transform: ${({$closing}) => $closing ? 'translateX(-200%)' : 'translate(0)'};
    animation: ${appearance} 400ms;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${({$width}) => `calc(100% - ${$width}%)`};
        height: 5px;
        background-color: ${({$type}) => $type === 'error' ? 'var(--clr-red)' : 'green'};
    }
`;

const Message = styled.p`
    margin: 0;
`;
const CloseBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 1.8rem;
    padding: .2rem;
`;
const BiErrorAltStyled = styled(BiErrorAlt)`
    color: var(--clr-red);
`;
const BiCheckCircleStyled = styled(BiCheckCircle)`
    color: green;
`;
const RiCloseFillStyled = styled(RiCloseFill)`

`;


export default function Notify({id, message, type}){
    const { removeNotify } = useContext(AppContext);

    const intervalId = useRef(null);
    const [closing, setClosing] = useState(false);
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
        handleStartTimer();

        return () => {
            clearInterval(intervalId.current);
        }
    }, [])

    

    const handleStartTimer = () => {
        intervalId.current = setInterval(() => {
            setWidth((prevState) => {

                if(prevState < 100){
                    return prevState + 1;
                }

                return prevState;
            });
            
        }, 20);
    }

    const handleClose = () => {
        clearInterval(intervalId.current);
        setClosing(true);
        setTimeout(() => {
            removeNotify(id);
        }, 400);
    }

    useEffect(() => {
        if(width === 100){
            handleClose();
        }
    }, [width])

    return (
        <Wrapper onMouseLeave={() => handleStartTimer()} onMouseEnter={() => clearInterval(intervalId.current)} $type={type} $width={width} $closing={closing}>
            {type === 'error' ? <BiErrorAltStyled/> : <BiCheckCircleStyled/>}
            <Message>{message}</Message>
            <CloseBtn onClick={handleClose}>
                <RiCloseFillStyled/>
            </CloseBtn>       
        </Wrapper>
    )
}