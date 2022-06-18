import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { IAvans } from "../../types";
import { roundAmount } from "../../utils";
import { AmountBox } from "../UI";
import { DetailItem, DetailsBox } from "./AvansuriDetails.style";

const getAmount = (array: IAvans[], property: "amount" | "amountInMDL") =>
  roundAmount(array.reduce((acc, cur) => acc + cur[property], 0));

const AvansuriDetails = () => {
  const [transformEUR, setTransformEUR] = useState(false);
  const [transformUSD, setTransformUSD] = useState(false);
  const avansuri = useAppSelector((state) => state.project.avansuri);

  const invertEUR = () => setTransformEUR((prev) => !prev);
  const invertUSD = () => setTransformUSD((prev) => !prev);

  const inEUR = avansuri.filter((avans) => avans.currency === "eur");
  const inUSD = avansuri.filter((avans) => avans.currency === "usd");
  const inMDL = avansuri.filter((avans) => avans.currency === "mdl");

  return (
    <DetailsBox>
      {/* <span>Total:</span> */}
      <DetailItem onClick={invertEUR}>
        <AmountBox type="total" pointer>
          {transformEUR
            ? `${getAmount(inEUR, "amountInMDL")} lei`
            : `€${getAmount(inEUR, "amount")}`}
        </AmountBox>
      </DetailItem>
      <DetailItem onClick={invertUSD}>
        <AmountBox type="total" pointer>
          {transformUSD
            ? `${getAmount(inUSD, "amountInMDL")} lei`
            : `$${getAmount(inUSD, "amount")}`}
        </AmountBox>
      </DetailItem>
      <DetailItem>
        <AmountBox type="total">{getAmount(inMDL, "amount")} lei</AmountBox>
      </DetailItem>
    </DetailsBox>
  );
};

export default AvansuriDetails;
