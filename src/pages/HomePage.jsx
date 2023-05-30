// React
import { useContext, useEffect } from "react";
// React Router
import { useLocation, useSearchParams } from "react-router-dom";
// Libraries
import styled from "styled-components";
// Components
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import Pagination, { pageSize } from "../components/Pagination";
import NotFound from "../components/NotFound";
// Context
import { AppContext } from "../context/AppContext";

const Wrapper = styled.section``;

export default function HomePage({loading, scrolling, setScrolling}){

    const { comics, filteredArray, currentPage, sortOptions } = useContext(AppContext);
    
    const pageQty = Math.ceil(comics.length / pageSize);
    const sortParam = new URLSearchParams(window.location.search).get('sort');
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    
    useEffect(() => {

        if(location.state){
            setSearchParams(location.state);
        }
    }, []);

    return (
        <Wrapper>
            {loading ? <ProductList loading={loading}/> : !loading && filteredArray && currentPage <= pageQty && (sortParam ? sortOptions.find(item => item === sortParam) : true) ? (
                <>
                    <Filter/>
                    <ProductList scrolling={scrolling}/>
                    <Pagination setScrolling={setScrolling}/>
                </>
            ) : <NotFound text={'Nothing found'}/>}
        </Wrapper>
    )
}