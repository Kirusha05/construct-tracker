import { useAppSelector } from "../../hooks";
import { AmountBox, Card } from "../UI";
import { DetailField } from "./Details.style";

const Details = () => {
  const details = useAppSelector((state) => state.project.details);

  const isInMinus = details.remainingCredit < 0;

  return (
    <Card>
      <DetailField>
        <p>Credit Total</p>
        <AmountBox type="total">{details.totalCredit} lei</AmountBox>
      </DetailField>
      <DetailField>
        <p>Credit Folosit</p>
        <AmountBox type="used">{details.usedCredit} lei</AmountBox>
      </DetailField>
      <DetailField>
        <p>Credit Rămas</p>
        <AmountBox type={isInMinus ? "used" : "remaining"}>
          {details.remainingCredit} lei
        </AmountBox>
      </DetailField>
    </Card>
  );
};

export default Details;
