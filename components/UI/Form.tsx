import styled from "styled-components";

const Form = styled.form<{ borders?: boolean; mt?: number }>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "20px")};
  gap: 10px;
  border-bottom: ${({ borders }) =>
    borders ? "1px solid rgba(0, 0, 0, 0.1);" : "none"};
  padding-bottom: ${({ borders }) => (borders ? "20px" : "0")};
`;

export default Form;
