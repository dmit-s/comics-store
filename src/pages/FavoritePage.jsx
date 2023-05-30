// React
import { useContext, useEffect, useState } from "react";
// Libraries
import styled from "styled-components";
// Components
import FavoriteList from "../components/FavoriteList";
// Context
import { AppContext } from "../context/AppContext";
// Api
import { getComicsById } from "../api";
import FavoritesTop from "../components/FavoritesTop";
import NotFound from "../components/NotFound";

const Wrapper = styled.section``;

export default function FavoritePage(){
    const { favoritesComics, setFilteredArray } = useContext(AppContext);
    const [favoriteComicsData, setFavoriteComicsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFilteredArray([]);
        if(!favoritesComics.length) return setLoading(false);

        Promise.all(favoritesComics.map(id => getComicsById(id)))
            .then(data => {
                setLoading(false);
                setFavoriteComicsData(data);
            })
    }, [])

    return (
        <Wrapper>
            {!favoritesComics.length ? <NotFound text={`You don't have anything in your favorites`}/> : (
                <>
                    <FavoritesTop setFavoriteComicsData={setFavoriteComicsData}/>
                    <FavoriteList favoriteComicsData={favoriteComicsData} loading={loading}/>
                </>
            )}
        </Wrapper>
    )
}