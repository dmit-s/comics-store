// React
import { useContext } from "react";
// React Router
import { Link, useSearchParams } from "react-router-dom";
// Libraries
import styled from "styled-components";
// Context
import { AppContext } from "../context/AppContext";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Message = styled.h2`
    margin: 0 0 2.5rem;
    text-align: center;
    font-size: 2rem;
`;
export const HomeLink = styled(Link)`
    font-size: 1.1rem;
    padding: .5rem 1rem;
    background-color: var(--clr-purple-light);
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    transition: .3s;

    &:hover{
        background-color: #d8b6ed;
    }
`;

export default function NotFound({text}){
    const { setCurrentPage, setFilteredArray, selectSortOption } = useContext(AppContext);

    const [searchParams] = useSearchParams();

    const handleClick = () => {
        setCurrentPage(1);
        setFilteredArray([]);
        selectSortOption('Default');
    }

    return (
        <Wrapper>
            <Message>
                {text}
            </Message>
            <HomeLink to={searchParams.get('q') ? `/?q=${searchParams.get('q')}` : '/'}  onClick={handleClick}>Back to Home Page</HomeLink>
        </Wrapper>
    )
}