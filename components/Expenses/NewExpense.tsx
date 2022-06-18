import { useEffect, useMemo, useRef, useState } from "react";
import { roundAmount } from "../../utils";
import { DateSelect } from "..";
import {
  Button,
  Form,
  FormActions,
  FormField,
  Input,
  Label,
  TotalPrice,
} from "../UI";
interface IProps {
  onSubmit: (
    name: string,
    price: number,
    itemType: string,
    quantity: number,
    date: string
  ) => void;
  onCancel: () => void;
  implicitData?: {
    name: string;
    price: number;
    itemType: string;
    quantity: number;
    date: string;
  };
}

const NewExpense = ({ onSubmit, onCancel, implicitData }: IProps) => {
  const [newName, setNewName] = useState(implicitData?.name || "");
  const [newPrice, setNewPrice] = useState(implicitData?.price || 0);
  const [newQuantity, setNewQuantity] = useState(implicitData?.quantity || 0);
  const [newDate, setNewDate] = useState(
    implicitData?.date || new Date().toISOString()
  );
  const [newType, setNewType] = useState(implicitData?.itemType || "");

  const [currentRef, setCurrentRef] = useState(implicitData ? 2 : 0);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const refsArray = useMemo(
    () => [nameRef, priceRef, typeRef, quantityRef],
    [nameRef, priceRef, typeRef, quantityRef]
  );

  useEffect(() => {
    refsArray[currentRef].current!.focus();
  }, [currentRef, refsArray]);

  useEffect(() => {
    if (window.innerWidth < 600) return;
    const inputTop = refsArray[0].current!.getBoundingClientRect().top;
    const offsetY = 300;
    const scrollTop = inputTop + window.pageYOffset + offsetY;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  }, [refsArray]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newName || !newPrice || !newType || !newQuantity) {
      if (!newName) setCurrentRef(0);
      if (newName) setCurrentRef(1);
      if (newPrice) setCurrentRef(2);
      if (newType) setCurrentRef(3);
      return;
    }
    onSubmit(newName, newPrice, newType, newQuantity, newDate);
  };

  return (
    <Form onSubmit={submitHandler} borders={Boolean(implicitData)}>
      <FormField>
        <Label>Nume</Label>
        <Input
          ref={nameRef}
          type="text"
          placeholder="Numele achiziției..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label>Preț (lei)</Label>
        <Input
          ref={priceRef}
          step="0.01"
          type="number"
          placeholder="Preț/bucată..."
          value={newPrice || ""}
          onChange={(e) => setNewPrice(Math.abs(Number(e.target.value)))}
        />
      </FormField>
      <FormField>
        <Label>Tipul</Label>
        <Input
          ref={typeRef}
          type="text"
          placeholder="Cutii/metri/saci..."
          value={newType || ""}
          onChange={(e) => setNewType(e.target.value.toLowerCase())}
        />
      </FormField>
      <FormField>
        <Label>Cantitatea</Label>
        <Input
          ref={quantityRef}
          type="number"
          placeholder="Cantitatea..."
          value={newQuantity || ""}
          onChange={(e) => setNewQuantity(Math.abs(Number(e.target.value)))}
        />
      </FormField>
      <DateSelect onChange={setNewDate} />
      <FormActions>
        <TotalPrice>
          Total: {roundAmount(newPrice * newQuantity)} lei
        </TotalPrice>
        <Button type="submit">{implicitData ? "Modifică" : "Adaugă"}</Button>
        <Button type="button" onClick={onCancel}>
          ❌
        </Button>
      </FormActions>
    </Form>
  );
};

export default NewExpense;
