import { MdDelete } from "react-icons/md";
import styled from "styled-components";

export const SalariuItem = styled.div`
  padding-left: 26px;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    padding-bottom: 16px;
  }

  &:last-child {
    margin-bottom: 8px;
    &::before {
      height: 50%;
    }
    &::after {
      top: 50%;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10px;
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.lightBlue};
  }

  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 10px;
    width: 12px;
    height: 2px;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;

    &:not(:last-child) {
      padding-bottom: 10px;
    }
  }
`;

export const SalariuMain = styled.div`
  display: flex;
  align-items: center;
`;

export const SalariuBold = styled.span`
  font-weight: bold;
`;

export const SalariuIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SalariuDelete = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;
