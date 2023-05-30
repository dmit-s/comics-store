// React
import { useContext, useEffect } from "react";
// Libraries
import styled from "styled-components";
// Icons
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
// Context
import { AppContext } from "../context/AppContext";

export const Wrapper = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: .2s ease-in-out;

    & > *{
        margin-right: .25rem;
    }

    & svg {
        font-size: ${({$iconSize}) => $iconSize ? $iconSize : '2.25rem'};
    }

    &:hover {
        color: var(--clr-red);
    }
`;
const TiHeartOutlineStyled = styled(TiHeartOutline)`

`;

export default function AddToFavoriteBtn({ id, recentlyRemoved, setRecentlyRemoved, children, iconSize }){
    const { favoritesComics, addToFavoritesOrRemove } = useContext(AppContext);

    const handleClick = () => {
        addToFavoritesOrRemove(id);

        recentlyRemoved && setRecentlyRemoved(() => {
            if(new Set(recentlyRemoved).has(id)){
                return recentlyRemoved.filter(rId => rId !== id);
            } else {
                return [...recentlyRemoved, id];
            }
        })
    }

    return (
        <Wrapper $iconSize={iconSize} style={{opacity: '1 !important'}} onClick={handleClick}>
            {!favoritesComics.find(cId => cId === id) ? <TiHeartOutline/> : <TiHeartFullOutline style={{color: 'var(--clr-red)'}}/>} 
            {children}
        </Wrapper>
    )
}