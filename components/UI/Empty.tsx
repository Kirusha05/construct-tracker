import styled from "styled-components";

const Empty = styled.p<{ mt?: boolean }>`
  font-size: 16px;
  margin-top: ${props => props.mt ? "10px" : "0"};

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export default Empty;