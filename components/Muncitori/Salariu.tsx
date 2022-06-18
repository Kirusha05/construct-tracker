import { useAppSelector } from "../../hooks";
import { ISalariu } from "../../types";
import { formatDate } from "../../utils";
import { AmountBox } from "../UI";
import {
  SalariuBold,
  SalariuDelete,
  SalariuIcon,
  SalariuItem,
  SalariuMain,
} from "./Salariu.style";

interface IProps {
  salariu: ISalariu;
  onDelete: () => void;
}

const Salariu = ({ salariu: { amount, date }, onDelete }: IProps) => {
  const editMode = useAppSelector((state) => state.admin.editMode);

  return (
    <SalariuItem>
      <SalariuBold>{formatDate(date)}</SalariuBold>
      <SalariuMain>
        <AmountBox type="used">{amount} lei</AmountBox>
        {editMode && (
          <SalariuIcon onClick={onDelete}>
            <SalariuDelete />
          </SalariuIcon>
        )}
      </SalariuMain>
    </SalariuItem>
  );
};

export default Salariu;
