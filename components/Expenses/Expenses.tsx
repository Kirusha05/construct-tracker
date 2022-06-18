import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { nanoid } from "@reduxjs/toolkit";
import { roundAmount } from "../../utils";
import { addExpense } from "../../store/projectSlice";
import { Button, Collapsable, Empty } from "../UI";
import { ExpensesList, AddExpense } from "./Expenses.style";
import NewExpense from "./NewExpense";
import Expense from "./Expense";
import { ExpenseType } from "../../types";

interface IProps {
  title: string;
  type: ExpenseType;
}

const Expenses = ({ title, type }: IProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const expenses = useAppSelector((state) => state.project[type]);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const sortedList = expenses
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const expensesList = sortedList.map((expense) => (
    <Expense key={expense.id} expense={expense} type={type} />
  ));

  const addHandler = (
    name: string,
    price: number,
    itemType: string,
    quantity: number,
    date: string
  ) => {
    const newExpense = {
      name,
      unitPrice: price,
      itemType,
      quantity,
      date,
      totalPrice: roundAmount(price * quantity),
      id: nanoid(6),
    };
    dispatch(addExpense({ newExpense, type }));
    setIsAdding(false);
  };

  return (
    <Collapsable cardTitle={title}>
      <ExpensesList editMode={editMode}>
        {expensesList.length ? (
          expensesList
        ) : (
          <Empty>
            Nicio achiziție{type === "suplimentare" ? " suplimentară" : ""}. Adăugați una nouă...
          </Empty>
        )}
      </ExpensesList>
      {!isAdding && editMode && (
        <AddExpense>
          <Button onClick={() => setIsAdding(true)}>Achiziție Nouă</Button>
        </AddExpense>
      )}
      {isAdding && editMode && (
        <NewExpense onSubmit={addHandler} onCancel={() => setIsAdding(false)} />
      )}
    </Collapsable>
  );
};

export default Expenses;
