import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IMuncitor } from "../../types";
import { Button, Collapsable, Empty } from "../UI";
import { addWorker } from "../../store/projectSlice";
import { AddMuncitor, MuncitoriList } from "./Muncitori.style";
import NewMuncitor from "./NewMuncitor";
import Muncitor from "./Muncitor";

const Muncitori = () => {
  const [isAdding, setIsAdding] = useState(false);
  const workers = useAppSelector((state) => state.project.workers);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const addHandler =  (name: string) => {
    const newWorker: IMuncitor = {
      name,
      id: nanoid(6),
      salarii: []
    };

    dispatch(addWorker(newWorker));
    setIsAdding(false);
  };

  const sortedList = workers.slice()
    .sort((a, b) => a.name.localeCompare(b.name, "ro-RO"));

  const workersList = sortedList.map((worker) => <Muncitor key={worker.id} {...worker} />);

  return (
    <Collapsable cardTitle="Muncitori">
      <MuncitoriList editMode={editMode}>
        {workersList.length ? (
          workersList
        ) : (
          <Empty>Niciun salariu. Adăugați un muncitor nou...</Empty>
        )}
      </MuncitoriList>
      {!isAdding && editMode && (
        <AddMuncitor>
          <Button onClick={() => setIsAdding(true)}>Muncitor Nou</Button>
        </AddMuncitor>
      )}
      {isAdding && editMode && (
        <NewMuncitor
          onSubmit={addHandler}
          onCancel={() => setIsAdding(false)}
        />
      )}
    </Collapsable>
  );
};

export default Muncitori;
