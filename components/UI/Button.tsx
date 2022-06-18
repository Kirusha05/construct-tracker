import styled from "styled-components";

const Button = styled.button<{ small?: boolean; narrow?: boolean }>`
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15), -3px -3px 6px #fdfdfd;
  height: ${(props) => (props.small ? "2rem" : "2.5rem")};
  border: none;
  border-radius: 0.5rem;
  padding: ${(props) => (props.narrow ? "0 0.6rem" : "0 1.5rem")};
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: 0.15s ease-out;

  font-size: 18px;

  &:active {
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.15),
      inset -3px -3px 6px #fdfdfd;
  }

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: 0 0.6rem;
    height: 2rem;
  }
`;

export default Button;