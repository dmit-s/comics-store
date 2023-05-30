// React
import { useState, useRef, useEffect, useContext } from "react";

// Libraries
import styled from "styled-components";

// Icons
import { FaTrash } from "react-icons/fa";

// Components
import ProductCounter from "./ProductCounter";
import AddToFavoriteBtn from "./AddToFavoriteBtn";
import { Title, Creators, IMG_SIZE } from "./ProductItem";
import { AppContext } from "../context/AppContext";
import { ImgSkeleton } from "./ProductItemSkeleton";

const Wrapper = styled.li`
    display: flex;
    width: 100%; 
    &:not(:last-child){
        margin-bottom: 2rem;
    }
`;
const ImgContainer = styled.div`
    max-width: 140px;
    width: 70%;
    height: 100%;
    display: flex;
    margin-right: 1rem;
    cursor: pointer;
`;
const Img = styled.img`
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    
`;
const Cell = styled.div`    
    margin: .25rem 0;

    &:last-child{
        display: flex;
        align-items: center;

        @media(min-width: 380px){
            display: block;
        }
    }

    @media(min-width: 1024px){
        padding: .5rem 1rem;
    }
`;
const Price = styled.span`
    display: inline-block;
    font-weight: var(--fw-bold);
    font-size: 1.3rem;
    color: var(--clr-green);
    margin-top: .5rem;

    @media(min-width: 380px){
        margin: .5rem 0;
    }

    @media(min-width: 1024px){
        margin: 0;
        margin-top: 1rem;
    }
`;
const Body = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto);
    width: 100%;

    @media(min-width: 1024px){
        grid-template-rows: auto;
        grid-template-columns: minmax(0, 50%) repeat(2, 1fr);
    }

    @media(min-width: 1280px){
        grid-template-columns: minmax(0, 40%) repeat(2, 1fr);
    }
`;
const RemoveFromBasketBtn = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: .25rem;
    transition: .2s ease-in-out;

    &:hover {
        color: var(--clr-red);
    }

    & * {
        margin-right: .25rem;
    }

    & svg {
        padding-left: .3rem;
        font-size: 1.4rem;
    }

    @media(min-width: 380px){
        margin: 0;
        margin-top: .25rem;
    }

    @media(min-width: 1024px){
        margin: 0;
        margin-top: 1rem;
    }
`;
const TitleBasket = styled(Title)`
    cursor: pointer;
`;
const CreatorsBasket = styled(Creators)``;
const BtnText = styled.span`
    display: none;

    @media(min-width: 380px){
        display: inline-block;
    }
`;



export default function BasketListItem(props){
    const {id, thumbnail: { path, extension }, title, creators: { items }, prices: { 0: { price } }, setBasketRenderData } = props;

    const { basketComics, removeFromBasket, showProductModal } = useContext(AppContext);

    const [inView, setInView] = useState(false);

    const ref = useRef(null);  

    const getPrice = () => {
        const findProduct = basketComics.find(item => item.id === id);

        return (findProduct.amount * price).toFixed(2);
    }

    const removeBasketItem = (id) => {
        removeFromBasket(id);

        setBasketRenderData((prevState) => prevState.filter(item => item.id !== id));
    }

    
    // Observer
    const observerFunc = (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                setInView(true);
            }
        })
    }
    const observerOptions = {
        threshold: 0.1,
    }
    const observer = new IntersectionObserver(observerFunc, observerOptions);

    useEffect(() => {
        ref.current && observer.observe(ref.current);

        return () => ref.current && observer.unobserve(ref.current);
    }, [])

    return (
        <Wrapper ref={ref}>
            <ImgContainer onClick={() => showProductModal(id)}>
                {inView ? <Img src={`${path}/${IMG_SIZE}.${extension}`} alt={title}/> : <ImgSkeleton/>}
            </ImgContainer>
            <Body>
                <Cell>
                    <TitleBasket onClick={() => showProductModal(id)}>{title}</TitleBasket>
                    <CreatorsBasket>
                        {items.map(item => item.name).join(', ')}
                    </CreatorsBasket>
                </Cell>
                <Cell>
                    <ProductCounter id={id} setBasketRenderData={setBasketRenderData}/>  
                    <Price> $ {getPrice()}</Price>   
                </Cell>
                <Cell>
                    <AddToFavoriteBtn id={id} iconSize={'1.8rem'}>
                        <BtnText>
                            Add To Favorite    
                        </BtnText>
                    </AddToFavoriteBtn>
                    <RemoveFromBasketBtn onClick={() => removeBasketItem(id)}>
                        <FaTrash/>
                        <BtnText>
                            Delete
                        </BtnText>
                    </RemoveFromBasketBtn>
                </Cell>
            </Body>
        </Wrapper>
    )
}