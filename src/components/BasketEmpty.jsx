// React Router
import { useSearchParams } from "react-router-dom";
// Libraries
import styled from "styled-components";
// Components
import { HomeLink } from "./NotFound";

const Wrapper = styled.div``;
const Message = styled.p`
    margin: 0 0 2rem;
    padding: 1rem;
    color: var(--clr-purple);
    background-color: var(--clr-purple-light);
`;


export default function BasketEmpty(){
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Wrapper>
            <Message>Your cart is empty. Add items to your shopping cart by clicking the "Add To Cart" button next to the item you like.</Message>
            <HomeLink to={`${searchParams.get('q') ? `/?q=${searchParams.get('q')}` : '/'}`}>Back to Home Page</HomeLink>
        </Wrapper>
    )
}