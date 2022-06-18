import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";

const SectionTitle = styled.h2`
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;
 
const SectionArrow = styled(FaChevronLeft)<{ open: boolean }>`
  font-size: 22px;
  transition: 0.15s ease-out;
  transform: ${(props) => (props.open ? "rotate(-90deg)" : "none")};

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

interface IProps {
  open: boolean;
  title: string;
  onClick: () => void;
}

const SectionHeader = ({ open, title, onClick }: IProps) => {
  return (
    <SectionTitle onClick={onClick}>
      <span>{title}</span> <SectionArrow open={open} />
    </SectionTitle>
  );
}

export default SectionHeader;
