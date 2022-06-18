import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteExpense, editExpense } from "../../store/projectSlice";
import { ExpenseType, IExpense } from "../../types";
import { formatDate, roundAmount } from "../../utils";
import { AmountBox } from "../UI";
import {
  ExpenseField,
  ExpenseItem,
  ExpenseDelete,
  ExpenseMain,
  ExpenseIcon,
  ExpenseName,
  ExpenseEdit,
  ExpenseControl,
} from "./Expense.style";
import NewExpense from "./NewExpense";

interface IProps {
  expense: IExpense;
  type: ExpenseType;
}

const Expense = ({ expense, type }: IProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const { name, date, itemType, quantity, totalPrice, unitPrice, id } = expense;
  const formattedDate = formatDate(date);

  const deleteHandler = () => {
    if (!confirm("Sigur doriți să ștergeți această achiziție?")) return;
    dispatch(deleteExpense({ expenseID: id, type }));
  };

  const editHandler = (
    newName: string,
    newPrice: number,
    newType: string,
    newQuantity: number,
    newDate: string
  ) => {
    const newExpense = {
      name: newName,
      unitPrice: newPrice,
      itemType: newType,
      quantity: newQuantity,
      date: newDate,
      totalPrice: roundAmount(newPrice * newQuantity),
      id,
    };

    dispatch(editExpense({ newExpense, type }));
    setIsEditing(false);
  };

  if (isEditing) {
    const implicitData = { name, price: unitPrice, itemType, quantity, date };

    return (
      <NewExpense
        onSubmit={editHandler}
        onCancel={() => setIsEditing(false)}
        implicitData={implicitData}
      />
    );
  }

  return (
    <ExpenseItem editMode={editMode}>
      <ExpenseField>
        <ExpenseName>{name}</ExpenseName>
        <p>{formattedDate}</p>
      </ExpenseField>
      <ExpenseField>
        <p>{quantity} {itemType}</p>
        <p>{unitPrice} lei/unitate</p>
      </ExpenseField>
      <ExpenseField>
        <ExpenseMain>
          <AmountBox type="used">{totalPrice} lei</AmountBox>
          {editMode && (
            <ExpenseControl>
              <ExpenseIcon onClick={() => setIsEditing(true)}>
                <ExpenseEdit />
              </ExpenseIcon>
              <ExpenseIcon onClick={deleteHandler}>
                <ExpenseDelete />
              </ExpenseIcon>
            </ExpenseControl>
          )}
        </ExpenseMain>
      </ExpenseField>
    </ExpenseItem>
  );
};

export default Expense;
