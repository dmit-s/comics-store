// React
import { useContext, useRef } from "react";
// Libraries
import styled from "styled-components"
// React Router
import { NavLink, useSearchParams } from "react-router-dom";
// Icons
import { TiHome, TiShoppingCart, TiHeartFullOutline } from "react-icons/ti";
// Context
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";

const Wrapper = styled.nav`
    padding: .5rem 2rem;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;
    justify-content: space-between;

    width: 100%;
    background-color: #3b0049;
    box-shadow: 0px 0px 5px 0px #000;

    transform: ${({$show}) => $show ? 'translateY(0)' : 'translateY(200%)'};
    transition: .4s;

    @media(min-width: 768px) {
        max-width: 140px;
        position: static;
        transform: translate(0);
        background: none;
        box-shadow: none;
        padding: 0;
    }
    @media(min-width: 1024px) {
        max-width: 180px;
    }
`;
const Link = styled(NavLink).attrs(({$link}) => ({
    className: ({ isActive }) => isActive ? 'active' : '',
    to: $link
}))`
    display: flex;
    flex-direction: column;
    align-items: center;  

    &.active div:before {
        box-shadow: 0px 0px 15px 0px #fff;
    }



    @media(min-width: 768px) {
        &:first-child {
            display: none;
        }
    }
`;
const Circle = styled.div`
    position: relative;

    width: 2.8rem;
    height: 2.8rem;

    display: flex;
    flex-direction: column;
    align-items: center;  

    color: ${({color}) => color};

    &:before{
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--clr-white);
        border-radius: 50%;
        transition: .3s;

        @media(min-width: 768px) {
            background-color: var(--clr-gray-light);
        }
    }

    & svg {
        width: 2.25rem;
        z-index: 1;
        height: 100%;
    }
`;
const Text = styled.span`
    display: none;
    margin-top: .5rem;
    @media(min-width: 768px) {
        display: inline-block;
    }
    text-transform: uppercase;
    color: var(--clr-white);


`;
const Counter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 .25rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
    position: absolute;
    top: -5px;
    left: 60%;
    z-index: 1;
    border-radius: 50%;
    background-color: var(--clr-white);
    box-shadow: 0px 0px 5px 0px rgba(25, 43, 56, 0.8);
    color: var(--clr-text);
    font-weight: var(--fw-bold);


`;

export default function Nav(){
    const { basketComics, favoritesComics } = useContext(AppContext);

    let [searchParams] = useSearchParams();

    const basketAmount = basketComics.map(item => item.amount).reduce((acc, currentValue) => acc + currentValue, 0);

    const [show, setShow] = useState(true);
    const lastScrollPosition = useRef(null);


    const onScroll = () => {
        if(window.pageYOffset < lastScrollPosition.current){
            setShow(true);
        } else {
            setShow(false);
        }

        lastScrollPosition.current = window.pageYOffset;
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [])

    return (
        <Wrapper $show={show}>
            <Link $link={`${searchParams.get('q') ? `/?q=${searchParams.get('q')}` : '/'}`}>
                <Circle>
                    <TiHome/>
                </Circle>
            </Link>
            <Link $link={`${searchParams.get('q') ? `basket?q=${searchParams.get('q')}` : 'basket'}`}>
                <Circle color="var(--clr-purple)">
                    <TiShoppingCart/>
                    <Counter>
                        {basketAmount}
                    </Counter>
                </Circle>
                <Text>
                    Basket
                </Text>
            </Link>
            <Link $link={`${searchParams.get('q') ? `favorite?q=${searchParams.get('q')}` : 'favorite'}`}>
                <Circle color="var(--clr-red)">
                    <TiHeartFullOutline/>
                    <Counter>
                        {favoritesComics.length}
                    </Counter>
                </Circle>               
                <Text>
                    Favorite
                </Text>
            </Link>
        </Wrapper>
    )
}