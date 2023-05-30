// React
import { useState } from "react";
import { useContext, useEffect } from "react";
import { FaCloudMoonRain } from "react-icons/fa";
import styled from "styled-components"
import { getComicsById } from "../api";
import BasketEmpty from "../components/BasketEmpty";

// Components
import BasketList from "../components/BasketList";
import BasketTop from "../components/BasketTop";
import Checkout from "../components/Checkout";
import NotFound from "../components/NotFound";
import ThreeDotsLoading from "../components/ThreeDotsLoading";
// Context
import { AppContext } from "../context/AppContext";

const Wrapper = styled.section`

`;
const FlexContainer = styled.div`
    @media(min-width: 1280px){
        display: flex;
        align-items: flex-start;
    }
`;

export default function BasketPage(){
    const { basketComics, setFilteredArray } = useContext(AppContext);
    const [basketRenderData, setBasketRenderData] = useState([]);
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        setFilteredArray([]);
        if(basketComics.length){
            Promise.all(basketComics.map(c => getComicsById(c.id)))    
                .then(data => {
                    setBasketRenderData(data);
                    setLoading(false);
                })
        } else {
            
            setLoading(false);
        }

    }, [])


    return (
        <Wrapper>
            {loading ? <ThreeDotsLoading/> : !loading && basketRenderData.length ? (
                <>
                    <BasketTop setBasketRenderData={setBasketRenderData}/>
                    <FlexContainer>
                        <BasketList basketRenderData={basketRenderData} setBasketRenderData={setBasketRenderData}/>
                        <Checkout basketRenderData={basketRenderData}/>
                    </FlexContainer>
                </>
            ) : <BasketEmpty/>}

        </Wrapper>
    )
}