// React Router
import { Link, useLocation, useSearchParams } from "react-router-dom";
// Libraries
import styled from "styled-components";
// Components
import { Container } from "./Container";
import Search from "./Search";
import Nav from "./Nav";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Wrapper = styled.header`
    background: linear-gradient(45deg, #700037 0%, #650084 100%);
    box-shadow: 0px 0px 5px 0px #000;
`;
const Inner = styled.div`
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;
const HomeLink = styled(Link)`
    max-width: 135px;
    margin-bottom: 2rem;

    @media(min-width: 481px) {
        max-width: 150px;
    }
    @media(min-width: 768px) {
        max-width: 140px;
        margin: 0;
    }
`;
const Logo = styled.img.attrs({
    src: '/marvel-logo.png',
    alt: 'Marvel Comics',
})`   
    width: 100%;
`


export default function Header(){
    const location = useLocation();
    const { setCurrentPage, setFilteredArray, sortComics, selectSortOption } = useContext(AppContext);
    const [searchParams] = useSearchParams();


    const handleClick = () => {
        setCurrentPage(1);
        setFilteredArray([]);
        sortComics(searchParams.get('sort'));
        selectSortOption('Default');
    }

    return (
        <Wrapper>
            <Container>
                <Inner>
                    <HomeLink onClick={handleClick} to={`/`}>
                        <Logo/>
                    </HomeLink>
                    <Search/>
                    <Nav/>
                </Inner>
            </Container>
        </Wrapper>
    )
}