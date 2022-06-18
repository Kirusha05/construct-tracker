import { MdDelete, MdEdit } from "react-icons/md";
import styled, { css } from "styled-components";

export const ExpenseItem = styled.div<{ editMode?: boolean }>`
  padding: 6px 0;
  font-size: 18px;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    ${({ editMode }) => !editMode && css`
      border-bottom: none;
      padding-bottom: 0;
    `};
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    flex-direction: column;
    gap: 6px;
    padding: 8px 0;
  }
`;

export const ExpenseField = styled.div`
  margin-bottom: 4px;

  &:not(:last-child) {
    flex: 1;

    *:first-child {
      margin-bottom: 4px;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 0;

      *:first-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const ExpenseName = styled.h2`
  font-size: inherit;
  color: ${({ theme }) => theme.lightBlue};

  @media screen and (max-width: 600px) {
    max-width: 60%;
  }
`;

export const ExpenseMain = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ExpenseControl = styled.div`
  display: flex;
  align-items: center;
`;

export const ExpenseIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-left: 4px;
  }
`;

export const ExpenseDelete = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const ExpenseEdit = styled(MdEdit)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;
