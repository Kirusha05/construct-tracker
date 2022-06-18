import styled from "styled-components";

export const MuncitoriList = styled.div<{ editMode?: boolean }>`
  margin: ${({ editMode }) => (editMode ? "10px 0" : "10px 0 0")};
  border-bottom: ${({ editMode }) => editMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
`;

export const AddMuncitor = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
