import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addAvans, deleteAvans } from "../../store/projectSlice";
import { Currency, IAvans, IExchange } from "../../types";
import { fetchExchangeRates, roundAmount } from "../../utils";
import { Button, Collapsable, Empty } from "../UI";
import Avans from "./Avans";
import NewAvans from "./NewAvans";
import { AddAvans, AvansuriList } from "./Avansuri.style";
import AvansuriDetails from "./AvansuriDetails";

export type AddAvans = (amount: number, currency: Currency, amountInMDL: number, date: string) => void;

const defaultRates = {
  eur: 20,
  usd: 20,
};

const Avansuri = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<IExchange>(defaultRates);
  const avansuri = useAppSelector((state) => state.project.avansuri);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchExchangeRates().then((rates) => setExchangeRates(rates));
  }, []);

  const addHandler: AddAvans = (amount, currency, amountInMDL, date) => {
    const newAvans: IAvans = {
      amount,
      currency,
      amountInMDL,
      date,
      id: nanoid(6),
    };

    dispatch(addAvans(newAvans));
    setIsAdding(false);
  };

  const deleteHandler = (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest avans?")) return;
    dispatch(deleteAvans(id));
  };

  const sortedList = avansuri
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const avansuriList = sortedList.map((avans) => (
    <Avans
      key={avans.id}
      amount={avans.amount}
      amountInMDL={avans.amountInMDL}
      date={avans.date}
      onDelete={() => deleteHandler(avans.id)}
      currency={avans.currency}
    />
  ));

  return (
    <Collapsable cardTitle="Avansuri">
      <AvansuriDetails />
      <AvansuriList editMode={editMode}>
        {avansuriList.length ? (
          avansuriList
        ) : (
          <Empty>Niciun avans. Adăugați unul nou...</Empty>
        )}
      </AvansuriList>
      {!isAdding && editMode && (
        <AddAvans>
          <Button onClick={() => setIsAdding(true)}>Avans Nou</Button>
        </AddAvans>
      )}
      {isAdding && editMode && (
        <NewAvans
          onSubmit={addHandler}
          onCancel={() => setIsAdding(false)}
          exchangeRates={exchangeRates}
        />
      )}
    </Collapsable>
  );
};

export default Avansuri;
