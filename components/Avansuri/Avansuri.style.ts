import styled from "styled-components";

export const AvansuriList = styled.div<{ editMode?: boolean }>`
  padding-bottom: ${({ editMode }) => (editMode ? "10px" : "0")};
  margin: ${({ editMode }) => (editMode ? "10px 0" : "10px 0 0")};
  border-bottom: ${({ editMode }) =>
    editMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
`;

export const AddAvans = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
