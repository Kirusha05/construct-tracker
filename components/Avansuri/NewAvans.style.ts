import styled from "styled-components";
import { Button } from "../UI";

export const CursulCurent = styled.p`
  font-weight: bold;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 14px;
  }
`;

export const CurrencySelect = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  color: ${({theme}) => theme.textSecondary};

  & > * {
    flex: 1;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  };
`;

export const CurrencyButton = styled(Button)<{ selected?: boolean }>`
  padding: 0 16px;
  font-weight: bold;
  color: ${({ theme, selected }) =>
    selected ? theme.lightBlue : theme.textPrimary};
`;