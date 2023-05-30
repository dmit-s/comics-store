// Libraries
import styled from "styled-components"
// Components
import { Container } from "./Container";

const Wrapper = styled.footer`
    background-color: var(--clr-gray-light);
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-weight: var(--fw-bold)
`;

export default function Footer(){
    return (
        <Wrapper>
            <Container>
                <Content>&#169; {new Date().getFullYear()}</Content>
            </Container>   
        </Wrapper>
    )
}