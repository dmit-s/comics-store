// React
import { useContext, useEffect, useRef, useState } from "react";
// Libraries
import styled from "styled-components"
// Components
import AddToBasketBtn from "./AddToBasketBtn";
import AddToFavoriteBtn from "./AddToFavoriteBtn";
import ProductCounter from "./ProductCounter";
import { ImgSkeleton } from "./ProductItemSkeleton";
// Context
import { AppContext } from "../context/AppContext";


export const Wrapper = styled.li`
    display: flex;
    flex-direction: column;
    max-width: 190px;
    width: 100%;
    transition: .4s;

    @media(min-width: 1024px){
        max-width: 250px;
        padding: .25rem 1rem 1rem 1rem;

        &:hover {
            box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.35);
        }
    }
    


    
    & > *{
        opacity: ${({$disable}) => $disable ? '0.5' : '1'}; 
    };
`;
export const ImgContainer = styled.div`
    display: flex;
    padding: 1.25rem;
    cursor: pointer;
    pointer-events: ${({$productModal}) => $productModal ? 'none' : 'auto'};
`;
const Img = styled.img`
    width: 100%;
`;
export const Body = styled.div`
    flex: 1 1 auto;
    cursor: pointer;
`;
export const Title = styled.h4`
    word-wrap: break-word;
    font-size: 1.1rem;
    font-weight: var(--fw-normal);
    margin: 0;
    padding-bottom: 1px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`;
export const Creators = styled.p`
    word-wrap: break-word;
    font-weight: var(--fw-light);
    margin: .25rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    padding-bottom: 1px;

    @media(min-width: 768px){
        margin: .75rem 0 1rem;
    }

`;
export const Price = styled.span`
    display: inline-block;
    font-weight: var(--fw-bold);
    font-size: 1.3rem;
    color: var(--clr-green);
`;
export const Footer = styled.div``;
export const FooterBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1rem;
`;

export const IMG_SIZE = `portrait_uncanny`;

export default function ProductItem(props){
    const {id, thumbnail: { path, extension }, title, creators: { items }, prices: { 0: { price } }, recentlyRemoved, setRecentlyRemoved } = props;
    const { basketComics, showProductModal, productModal } = useContext(AppContext);
    const [inView, setInView] = useState(false);
    const ref = useRef(null);  

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
        <Wrapper $disable={new Set(recentlyRemoved).has(id) ? true : false} ref={ref}>
            <ImgContainer $productModal={productModal} onClick={() => showProductModal(id)}>
                {inView ? <Img src={`${path}/${IMG_SIZE}.${extension}`} alt={title}/> : <ImgSkeleton/>}     
            </ImgContainer>
            
            <Body onClick={() => showProductModal(id)}>
                <Title>{title}</Title>
                <Creators>{items.map(item => item.name).join(', ')}</Creators>
            </Body>
            
            <Footer>
                <Price>$ {price}</Price>
                <FooterBottom>
                    {basketComics.find(c => c.id === id) ? <ProductCounter id={id} recentlyRemoved={recentlyRemoved}/> : <AddToBasketBtn id={id} recentlyRemoved={recentlyRemoved}/>}
                    <AddToFavoriteBtn id={id} recentlyRemoved={recentlyRemoved} setRecentlyRemoved={setRecentlyRemoved}/>
                </FooterBottom>
            </Footer>
        </Wrapper>
    )
}