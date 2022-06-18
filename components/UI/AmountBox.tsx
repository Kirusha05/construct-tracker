import styled, { DefaultTheme } from "styled-components";

type ColorType = "total" | "used" | "remaining";

const handleColorType = (type: ColorType, theme: DefaultTheme) => {
  switch (type) {
    case "total":
      return theme.lightBlue;
    case "used":
      return theme.lightRed;
    case "remaining":
      return theme.darkGreen;
  }
};

const AmountBox = styled.span<{ type: ColorType; pointer?: boolean }>`
  font-weight: bold;
  display: block;
  background: ${({ type, theme }) => handleColorType(type, theme)};
  color: white;
  padding: 1px 3px;
  border-radius: 5px;
  cursor: ${({ pointer }) => pointer ? "pointer" : "auto"};
`;

export default AmountBox;
