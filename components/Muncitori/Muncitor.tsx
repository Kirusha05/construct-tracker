import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addSalariu,
  deleteSalariu,
  deleteWorker,
} from "../../store/projectSlice";
import { IMuncitor, ISalariu } from "../../types";
import { Button } from "../UI";
import {
  MuncitorControl,
  MuncitorDelete,
  MuncitorIcon,
  MuncitorItem,
  MuncitorTitle,
  SalariiList,
} from "./Muncitor.style";
import NewSalariu from "./NewSalariu";
import Salariu from "./Salariu";

const Muncitor = ({ name, id, salarii }: IMuncitor) => {
  const [isAdding, setIsAdding] = useState(false);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const deleteMuncitorHandler = (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest muncitor?")) return;
    dispatch(deleteWorker(id));
  };

  const deleteSalariuHandler = (workerID: string, salariuID: string) => {
    if (!confirm("Sigur doriți să ștergeți acest salariu?")) return;
    dispatch(deleteSalariu({ workerID, salariuID }));
  };

  const addSalariuHandler = (amount: number, date: string) => {
    const newSalariu: ISalariu = {
      amount,
      date,
      id: nanoid(6),
    };

    dispatch(addSalariu({ salariu: newSalariu, workerID: id }));
    setIsAdding(false);
  };

  const sortedList = salarii
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const salariiList = (
    <SalariiList>
      {sortedList.map((salariu) => (
        <Salariu
          key={salariu.id}
          salariu={salariu}
          onDelete={() => deleteSalariuHandler(id, salariu.id)}
        />
      ))}
    </SalariiList>
  );

  if (!editMode) return (
    <MuncitorItem>
      <MuncitorTitle>
        <span>{name}</span>
      </MuncitorTitle>
      {salariiList}
    </MuncitorItem>
  );

  return (
    <MuncitorItem>
      <MuncitorTitle>
        <span>{name}</span>
        <MuncitorControl>
          {!isAdding && (
            <Button narrow small onClick={() => setIsAdding(true)}>
              Salariu Nou
            </Button>
          )}
          <MuncitorIcon onClick={() => deleteMuncitorHandler(id)}>
            <MuncitorDelete />
          </MuncitorIcon>
        </MuncitorControl>
      </MuncitorTitle>
      {isAdding && (
        <NewSalariu
          onSubmit={addSalariuHandler}
          onCancel={() => setIsAdding(false)}
          hasSalarii={Boolean(salarii.length)}
        />
      )}
      {salariiList}
    </MuncitorItem>
  );
};

export default Muncitor;
