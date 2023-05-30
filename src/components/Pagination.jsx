// React
import { useContext, useEffect } from "react";
// React Router
import { useSearchParams } from "react-router-dom";
// Libraries
import styled, { css } from "styled-components";
// Icons
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";
// Context
import { AppContext } from "../context/AppContext";


const Wrapper = styled.ul`
    display: ${({$hide}) => $hide ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;

    & > * {
        min-height: 1.8rem;  
    }

    @media(min-width: 768px) {
        justify-content: flex-end;
    }
`;
const Item = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .25rem;
    font-size: 1.1rem;
    cursor: pointer;
    min-width: 1.8rem;

    &:hover {
        background: ${({$type, $active, $disabled}) => $type === 'dots' || $active || $disabled ? '' : 'var(--clr-purple-light)'}; 
        color: ${({$type, $active, $disabled}) => $type === 'dots' || $active || $disabled ? '' : 'var(--clr-purple)'};
    }
    
    ${({$type, $active, $disabled}) => {
        switch ($type) {
            case "num":
                return css`
                    margin: 0 .25rem;          
                    background-color: ${$active ? 'var(--clr-purple)' : ''};
                    color: ${$active ? '#fff' : ''};
                `;
            case "arrow":
                return css`
                    color: ${$disabled && 'var(--clr-gray)'};
                    pointer-events: ${$disabled ? 'none' : 'all'};
                `;
                    
        }
    }}
`;
const DotsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const pageSize = 8;

export default function Pagination({setScrolling}){
    const { sortedComics, sliceComicsData, setCurrentPage, currentPage } = useContext(AppContext);

    const [searchParams, setSearchParams] = useSearchParams();

    const comicsTotalCount = sortedComics.length;

    const pageQty = Math.ceil(comicsTotalCount / pageSize);
    const sliceIndexStart = (currentPage * pageSize) - pageSize;
    const sliceIndexEnd = currentPage * pageSize;

    const handleChangePage = (num) => {
        setCurrentPage(num);
        updateSearchParams(num);

        window.scrollTo({top: 0, behavior: 'smooth'});
        setScrolling(true);

        setTimeout(() => {
            setScrolling(false);
        }, 400);
    }

    const updateSearchParams = (num) => {
        const params = Object.fromEntries([...searchParams]) || {};
        params.page = num || currentPage;
        setSearchParams(params);
    }

    const renderPageBtns = () => {
        let arrayNumbers = [];
        for(let i = 1; i <= pageQty; i++){
            arrayNumbers = [...arrayNumbers, i]
        }

        return arrayNumbers;
    }

    const getPageRange = () => {
        let pageRange = [1, 2, 3];
        if(pageQty < 3) return [];

        if(currentPage > 1 && currentPage !== pageQty){
            pageRange = [currentPage - 1, currentPage, currentPage + 1];
        } else if(currentPage === pageQty){
            pageRange = [currentPage - 1, currentPage];
        }
        return pageRange;
    }

    useEffect(() => {
        sliceComicsData(sliceIndexStart, sliceIndexEnd);
    }, [currentPage, sortedComics])

    return (
        <Wrapper>
            <Item $disabled={currentPage === 1} $type={'arrow'} onClick={() => handleChangePage(currentPage > 1 ? currentPage - 1 : currentPage)}>
                <IoChevronBack/>
            </Item>
            {pageQty < 3 && renderPageBtns().map(item => (
                <Item onClick={() => handleChangePage(item)} $active={currentPage === item} key={crypto.randomUUID()} $type={'num'}>{item}</Item>
            ))}

            {currentPage === 3 && (
                <Item onClick={() => handleChangePage(1)} $active={currentPage === 1} key={crypto.randomUUID()} $type={'num'}>1</Item>
            )}
            {currentPage === 4 && (
                <>
                    <Item onClick={() => handleChangePage(1)} $active={currentPage === 1} key={crypto.randomUUID()} $type={'num'}>1</Item>
                    <Item onClick={() => handleChangePage(2)} $active={currentPage === 2} key={crypto.randomUUID()} $type={'num'}>2</Item>
                </>       
            )}
            {currentPage > 4 && (
                <>
                    <Item onClick={() => handleChangePage(1)} $active={currentPage === 1} key={crypto.randomUUID()} $type={'num'}>1</Item>
                    <DotsWrapper>
                        <RxDotsHorizontal/>
                    </DotsWrapper>
                </>

            )}
            
            {getPageRange().map(item => <Item onClick={() => handleChangePage(item)} $active={currentPage === item} key={crypto.randomUUID()} $type={'num'}>{item}</Item>)}

            {currentPage < pageQty - 1 && pageQty > 3 && (
                <>
                    <DotsWrapper>
                        <RxDotsHorizontal/>
                    </DotsWrapper>
                    <Item onClick={() => handleChangePage(pageQty)} $active={currentPage === pageQty} key={crypto.randomUUID()} $type={'num'}>{pageQty}</Item>      
                </>
                
            )}
            
            
            <Item $disabled={currentPage === pageQty} $type={'arrow'} onClick={() => handleChangePage(currentPage < pageQty ? currentPage + 1 : currentPage)}>
                <IoChevronForward/>
            </Item>
        </Wrapper>
    )
}