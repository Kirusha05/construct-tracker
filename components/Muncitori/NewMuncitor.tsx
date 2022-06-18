import { useEffect, useRef, useState } from "react";
import { Button, Input } from "../UI";
import {
  Form,
  CursulCurent,
  CurrencySelect,
  CurrencyButton,
} from "./NewMuncitor.style";
import { roundAmount } from "../../utils";

interface IProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

const NewMuncitor = ({ onSubmit, onCancel }: IProps) => {
  const [newSalariuAmount, setNewAvansAmount] = useState(0);
  const [newName, setNewName] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current!.focus();
  }, []);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newName) return;
    onSubmit(newName);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Input
          ref={nameInputRef}
          type="text"
          placeholder="Numele muncitorului..."
          value={newName || ""}
          onChange={(e) => setNewName(e.target.value)}
        />
        {/* <Input
          type="number"
          placeholder="Suma salariului (lei)..."
          value={newSalariuAmount || ""}
          onChange={(e) => setNewAvansAmount(Math.abs(Number(e.target.value)))}
        /> */}
        <Button type="submit">Adaugă</Button>
        <Button type="button" onClick={onCancel}>❌</Button>
      </Form>
    </>
  );
};

export default NewMuncitor;
