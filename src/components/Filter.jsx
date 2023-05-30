// React
import { useState, useEffect, useContext, useRef } from "react";
// React Router
import { useSearchParams } from "react-router-dom";
// Libraries
import styled from "styled-components";
// Icons
import { IoChevronDown } from "react-icons/io5";
// Context
import { AppContext } from "../context/AppContext";
// Hooks
import useOnClickOutside from "../hooks/useOnClickOutside";


const Wrapper = styled.div`
    max-width: 130px;
    position: relative;

    @media(min-width: 768px) {
        max-width: 160px;
    }
`;
const CurrentValueContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .75rem;
    color: var(--clr-text);
    background-color: var(--clr-white);
    box-shadow: 0px 1px 5px 0px hsl(300, 100%, 27%, 0.5);
    border-radius: 5px;
    margin-bottom: .25rem;
    height: 30px;
    cursor: pointer;

    @media(min-width: 768px) {
        height: 35px;
    }
`;
const Input = styled.input`
    font-size: 1rem;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;
const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: absolute;
    width: 100%;
    
    height: ${({$show}) => $show ? '150px' : '0'};
    background-color: var(--clr-white);
    box-shadow: ${({$show}) => $show ? '0px 3px 5px 0px hsl(300, 100%, 27%, 0.5)' : 'none'};
    border-radius: 5px;
    overflow: hidden;
    transition: .3s;

    @media(min-width: 768px) {
        height: ${({$show}) => $show ? '175px' : '0'};
    }
    
`;
const ListItem = styled.li`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    padding: 0 .75rem;
    color: var(--clr-text);
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #d8b6ed;
    }
`;
const IoChevronDownStyled = styled(IoChevronDown)`
    transform: ${({$show}) => $show ? 'rotate(180deg)' : 'rotate(0)'};
    transition: .3s;
`;

export default function Filter(){
    const { setCurrentPage, selectedSortOption, sortOptions, selectSortOption, sortComics } = useContext(AppContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    const ref = useRef();
    

    const handleClick = (e) => {
        selectSortOption(e.target.textContent);
        setCurrentPage(1);
        updateSearchParams(1, e.target.textContent);
    }

    
    const updateSearchParams = (num, sortValue) => {
        const params = Object.fromEntries([...searchParams]) || {};
        sortValue === 'Default' ? delete params.sort : params.sort = sortValue;
        params.page = num;
        setSearchParams(params);
    }
    
    useEffect(() => {
        setShow(false);
        sortComics(selectedSortOption);
    }, [selectedSortOption])

    useOnClickOutside(ref, () => setShow(false));

    return (
        <Wrapper ref={ref}>
            <CurrentValueContainer onClick={() => setShow(!show)}>
                <Input disabled={true} value={selectedSortOption}/>
                <IoChevronDownStyled $show={show} fontSize={"1.8rem"}/>
            </CurrentValueContainer>
            <List $show={show}>
                {sortOptions.map(o => <ListItem key={o} onClick={handleClick}>{o}</ListItem>)}
            </List>
        </Wrapper>
    )
}