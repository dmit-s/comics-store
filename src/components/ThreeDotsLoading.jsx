import styled, { keyframes } from "styled-components"
const dotLeft = keyframes`
    0% {
        box-shadow: 9984px 0 0 -5px;
    }
    30% {
        box-shadow: 9984px 0 0 2px;
    }
    60%, 100% {
        box-shadow: 9984px 0 0 -5px;
    }
`;
const dotMid = keyframes`
    0% {
        box-shadow: 9999px 0 0 -5px;
    }
    30% {
        box-shadow: 9999px 0 0 2px;
    }
    60%, 100% {
        box-shadow: 9999px 0 0 -5px;
    }
`;
const dotRight = keyframes`
    0% {
        box-shadow: 10014px 0 0 -5px;
    }
    30% {
        box-shadow: 10014px 0 0 2px;
    }
    60%, 100% {
        box-shadow: 10014px 0 0 -5px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Dot = styled.div`
    position: relative;
    left: -9999px;
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: var(--clr-red);
    border-radius: 5px;
    color: var(--clr-red);
    box-shadow: 9999px 0 0 -5px;
    animation: ${dotMid} 1s infinite linear;
    animation-delay: 0.25s;

    &:not(:last-child){
        margin-right: .5rem;
    }

    &:first-child{
        box-shadow: 9984px 0 0 -5px;
        animation: ${dotLeft} 1s infinite linear;
        animation-delay: 0s;
    }

    &:last-child{
        box-shadow: 10014px 0 0 -5px;
        animation: ${dotRight} 1s infinite linear;
        animation-delay: 0.5s;
    }
`;

export default function ThreeDotsLoading(){
    return (
        <Wrapper>
            <Dot/>
            <Dot/>
            <Dot/>
        </Wrapper>

    )
}