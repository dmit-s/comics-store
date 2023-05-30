// React
import { useState, useEffect, useRef, useContext } from "react";
// React Router
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// Libraries
import styled from "styled-components";
// Icons
import { IoSearch, IoClose } from "react-icons/io5";
// Components
import SearchSuggestions from "./SearchSuggestions";
// Context
import { AppContext } from "../context/AppContext";
// Hooks
import useOnClickOutside from "../hooks/useOnClickOutside";


const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
    position: relative;

    @media(min-width: 768px) {
        margin: 0 2.5rem;
    }
`;
const Form = styled.form`
    padding: .25rem .5rem;

    width: 100%;

    display: flex;
    align-items: center;

    background-color: var(--clr-white);
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #bebebe;
`;
const Input = styled.input`
    padding-right: .5rem;
    width: 100%;
    font-size: 1.15rem; 
    cursor: text !important;
`;
const Btn = styled.button`
    display: flex;
    &:not(:last-child) {
        margin-right .5rem;
    }

    &:last-child {
        padding-left: .5rem;
        border-left: 1px solid var(--clr-text);
    }

    &:hover{
        color: var(--clr-purple);
    }

    & svg {
        font-size: 1.6rem;
    }
    
    cursor: pointer;
`;


export default function Search(){
    const [searchParams, setSearchParams] = useSearchParams();

    const { comics, sortComics, setCurrentPage, setFilteredArray, filteredArray } = useContext(AppContext);  

    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggList, setShowSuggList] = useState(false);
    const [placeholder, setPlaceholder] = useState('I want to find');

    const location = useLocation();
    const navigate = useNavigate();

    const refs = useRef([]);

    const updateSearchParams = () => {
        let params = Object.fromEntries([...searchParams]) || {};
        if(searchValue.length){
            params.q ? params.q = searchValue : params = {q: searchValue, ...params};
        } else {
            delete params.q;
        }
        setSearchParams(params);
    }

    const toggleSuggList = () => {
        if(suggestions.length && searchValue.length > 2){
            setShowSuggList(true);
        } else{
            setShowSuggList(false);
        }
    }

    const updateSuggestions = () => {
        if(searchValue.length > 2){
            setSuggestions(
                comics.map(c => {
                    if(formatStr(c.title).startsWith(formatStr(searchValue))){
                        return c;
                    } else if(searchValue.length > 4 && formatStr(c.title).includes(formatStr(searchValue))){
                        return c;
                    } else {
                        return null;
                    }                
                }).filter(i => i !== null)
            )
        } else{
            setSuggestions([]);
        }
    }

    const addToRefs = (el) => {
        if(!el || refs.current.includes(el)) return;
        refs.current.push(el);
    }

    const formatStr = (str) => {
        return str.trim().toUpperCase().replace(/[-():.#]{1,}/gm, ' ').replace(/[\s]{2,}/gm, ' ').trim();
    }

    const onSubmit = (e) => {
        e.preventDefault();  

        const filterComics = comics.filter(item => formatStr(item.title).startsWith(formatStr(searchValue)));      

        let params = Object.fromEntries([...searchParams]) || {};
        params = filterComics.length ? {...params, page: 1} : {...params}
        setSearchParams(params);

        if(location.pathname.includes('favorite') || location.pathname.includes('basket')){
            navigate("/", {state: params}); 
        }


        if(!filterComics.length){
            setFilteredArray(null);
            return;
        };

        setFilteredArray(filterComics);

        setCurrentPage(1);       
    }

    const onFocus = () => {
        toggleSuggList();
        setPlaceholder('');
    } 

    const onBlur = () => {
        setPlaceholder('I want to find');
    }

    useEffect(() => {
        sortComics(new URLSearchParams(window.location.search).get('sort'));
    }, [filteredArray])

    useEffect(() => {
        updateSuggestions();
        updateSearchParams();
    }, [searchValue])


    
    useOnClickOutside(refs, () => setShowSuggList(false));

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Input placeholder={placeholder} ref={(el) => addToRefs(el)} onFocus={onFocus} onBlur={onBlur} onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
                {searchValue.length ? (<Btn onClick={() => setSearchValue('')}><IoClose/></Btn>) : ''}
                <Btn>
                    <IoSearch/>
                </Btn>
            </Form>
            <SearchSuggestions searchValue={searchValue} suggestions={suggestions} showSuggList={showSuggList} setShowSuggList={setShowSuggList} toggleSuggList={toggleSuggList} addToRefs={addToRefs} refs={refs}/>
        </Wrapper>

    )
}