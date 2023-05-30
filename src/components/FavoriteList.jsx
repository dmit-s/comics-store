// React
import { useState } from "react";
// Libraries
import styled from "styled-components";
// Components
import ProductItem from "./ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { Wrapper as ProductListWrapper } from "./ProductList"; 

const Wrapper = styled(ProductListWrapper)``;

import { pageSize } from "./Pagination";


export default function FavoriteList({favoriteComicsData, loading}){
    const [recentlyRemoved, setRecentlyRemoved] = useState([]);


    return (
        <Wrapper>
            {!loading ? favoriteComicsData.map(f => <ProductItem key={f.id} {...f} recentlyRemoved={recentlyRemoved} setRecentlyRemoved={setRecentlyRemoved}/>) : (
                new Array(pageSize).fill().map(i => <ProductItemSkeleton key={crypto.randomUUID()}/>)
            )}
            
        </Wrapper>
    )
}