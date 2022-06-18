import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import styled from "styled-components";

export const MuncitorItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 2px;
    margin-bottom: 8px;
  }
`;

export const MuncitorTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.lightBlue};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  } 
`;

export const MuncitorControl = styled.div`
  display: flex;
`

export const MuncitorIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }
`;

export const MuncitorDelete = styled(MdDelete)`
  font-size: 27px;

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const MuncitorAdd = styled(GoPlus)`
  font-size: 27px;

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const SalariiList = styled.div`
  margin-top: 8px;
  width: 100%;
`;