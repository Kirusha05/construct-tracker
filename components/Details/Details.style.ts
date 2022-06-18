import styled from "styled-components";

export const DetailField = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 18px;
  padding: 6px 0;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;