import styled from "styled-components";

const Card = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15), -5px -5px 10px #fdfdfd;
  background: transparent;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  margin-top: 16px;

  @media screen and (max-width: 600px) {
    padding: 0.8rem;
    margin-top: 10px;
  }
`;

export default Card;
