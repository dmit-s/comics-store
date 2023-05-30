// React
import { useContext } from "react";
// Libraries
import styled from "styled-components";
// Components
import ProductItemSkeleton from "./ProductItemSkeleton";
import ProductItem from "./ProductItem";
// Context
import { AppContext } from "../context/AppContext";

export const Wrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 190px));
    gap: 2rem;
    justify-content: center;
    justify-items: center;

    margin-bottom: 4rem;

    padding-top: 2rem;

    @media(min-width: 420px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    @media(min-width: 481px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    @media(min-width: 768px) {
        gap: 3rem;
    }

    @media(min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));      
    }

`;

import { pageSize } from "./Pagination";

export default function ProductList({loading, scrolling}){
    const { comicsPerPage } = useContext(AppContext);

    return (
        <Wrapper>
            {!loading && !scrolling ? (
                comicsPerPage.map(c => <ProductItem key={c.id} {...c}/>)
            ) : new Array(pageSize).fill().map(i => (<ProductItemSkeleton key={crypto.randomUUID()}/>))}
        </Wrapper>
    )
}