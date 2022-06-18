import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { formatDate } from "../../utils";
import { AmountBox } from "../UI";
import {
  AvansBold,
  AvansDelete,
  AvansIcon,
  AvansItem,
  AvansMain,
} from "./Avans.style";

interface IProps {
  onDelete: () => void;
  date: string;
  amount: number;
  amountInMDL: number;
  currency: "eur" | "mdl" | "usd";
}

const currencyMap = {
  eur: "€",
  mdl: "",
  usd: "$",
};

const Avans = ({ date, onDelete, amount, amountInMDL, currency }: IProps) => {
  const [showInMDL, setShowInMDL] = useState(false); 
  const editMode = useAppSelector((state) => state.admin.editMode);
  
  const invertCurrency = () => setShowInMDL((prev) => !prev);

  const externalCurrency = currencyMap[currency];
  const inExternal = externalCurrency ? `${externalCurrency}${amount}` : `${amount} lei`;
  const inMDL = `${amountInMDL} lei`;

  return (
    <AvansItem>
      <AvansBold>{formatDate(date)}</AvansBold>
      <AvansMain>
        <AmountBox type="total" onClick={invertCurrency} pointer>
          {!showInMDL && inExternal}
          {showInMDL && inMDL}
        </AmountBox>
        {editMode && (
          <AvansIcon onClick={onDelete}>
            <AvansDelete />
          </AvansIcon>
        )}
      </AvansMain>
    </AvansItem>
  );
};

export default Avans;
