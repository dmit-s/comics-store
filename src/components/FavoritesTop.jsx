import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 5rem;
    padding: 1.5rem 0;

    &:after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        background-color: var(--clr-purple-light);
        width: 100%;
        height: 2px;
    }
`;
const Title = styled.h2`
    font-size: 2.6rem;
    margin: 0;
`;
const ClearFavoritesBtn = styled.button`
    padding: .25rem 0;
    font-size: 1.1rem;    
    cursor: pointer;
    transition: .3s;

    &:hover{
        color: var(--clr-red);
    }
`;

export default function FavoritesTop({setFavoriteComicsData}){
    const { removeAllFromFavorites } = useContext(AppContext);

    const removeAllItems = () => {
        setFavoriteComicsData([]);
        removeAllFromFavorites();
    }

    return (
        <Wrapper>
            <Title>Favorites</Title>
            <ClearFavoritesBtn onClick={removeAllItems}>Remove all</ClearFavoritesBtn>
        </Wrapper>
    )
}