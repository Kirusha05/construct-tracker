import styled from "styled-components";

const FormField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > *:nth-child(2) {
    flex: 5;
  }

  @media screen and (max-width: 600px) {
    & > *:nth-child(2) {
      flex: 3;
    }
  }
`;

export default FormField;
