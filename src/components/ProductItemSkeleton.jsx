// Libraries
import styled, { css, keyframes } from "styled-components";
// Components
import { Wrapper, ImgContainer, Body, Title, Creators, Price, Footer, FooterBottom} from "./ProductItem";

const skeletonAnim = keyframes`
    0% {
        background-color: hsl(200, 20%, 70%);
    }
    100% {
        background-color: hsl(200, 20%, 95%);
    }
`;
const styles = css`
    display: block;
    animation: ${skeletonAnim} 1s linear infinite alternate;
    border-radius: 5px;
`

// const SkeletonWrapper = styled(Wrapper)`
//     display: block;
// `;
// const SkeletonBody = styled(Body)`
//     display: block;
// `;
export const ImgSkeleton = styled.div`
    ${styles}
    width: 100%;    
    height: 250px;
    
`
const TitleTextSkeleton = styled.span`
    ${styles}
    width: 100%;
    height: 20px;
    
`;
const CreatorsSkeleton = styled.span`
    ${styles}
    width: 100%;
    height: 12px;

    &:last-child {
        width: 80%;
    }
    &:not(:last-child) {
        margin-bottom: .5rem;
    }
`;
const PriceValueSkeleton = styled.span`
    ${styles}
    width: 30%;
    height: 20px;
`;
const AddToBasketBtnSkeleton = styled.div`
    ${styles}
    width: 50%;
    height: 30px;
`
const AddToFavoriteBtnSkeleton = styled.div`
    ${styles}
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

export default function ProductItemSkeleton(){
    return (
        <Wrapper>
            <ImgContainer>
                <ImgSkeleton/>
            </ImgContainer>
            <Body>
                <Title>
                    <TitleTextSkeleton/>
                </Title>
                <Creators>
                    <CreatorsSkeleton/>
                    <CreatorsSkeleton/>
                </Creators>
            </Body>
            <Footer>
                <Price>
                    <PriceValueSkeleton/>
                </Price>
                <FooterBottom>
                    <AddToBasketBtnSkeleton/>
                    <AddToFavoriteBtnSkeleton/>
                </FooterBottom>
            </Footer>
        </Wrapper>
    )
}