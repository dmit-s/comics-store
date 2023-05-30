import styled from "styled-components";

const Wrapper = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--clr-purple-light);
    padding: .75rem;
    height: min-content;

`;

const ImgContainer = styled.div`
    max-width: 100px;
    margin-bottom: .5rem;
    
`;
const Img = styled.img`
    width: 100%;
`;
const Name = styled.span`
    flex: 1 1 auto;
    text-align: center;
`;


const IMG_SIZE = "standard_medium";

export default function CharactersItem(props){
    const {name, thumbnail: {path, extension}} = props;

    return (
        <Wrapper>
            <ImgContainer>
                <Img src={`${path}/${IMG_SIZE}.${extension}`} alt={name}/>
            </ImgContainer>
            <Name>{name}</Name>
        </Wrapper>
    )
}