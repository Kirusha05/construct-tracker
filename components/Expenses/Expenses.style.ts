import styled from "styled-components";

export const ExpensesList = styled.div<{ editMode?: boolean }>`
  margin: ${({ editMode }) => editMode? "10px 0" : "10px 0 0"};
`;

export const AddExpense = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;


