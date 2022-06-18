import styled from "styled-components";

export const AccessControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 4px 0 14px;
`;

export const AccessField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  /* font-weight: bold; */
  margin-top: 10px;
  margin-right: 10px;
  padding-right: 10px;
  cursor: pointer;
  user-select: none;

  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const AccessShare = styled.div`
  display: flex;
  justify-content: flex-end;
`;