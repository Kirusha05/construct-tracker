import { MdDelete } from "react-icons/md";
import styled from "styled-components";

export const AvansItem = styled.div`
  padding: 8px 0;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: 5px 0;
  }
`;

export const AvansMain = styled.div`
  display: flex;
  align-items: center;
`;

export const AvansBold = styled.span`
  font-weight: bold;
`;

export const AvansIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

export const AvansDelete = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;