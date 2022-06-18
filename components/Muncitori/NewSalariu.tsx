import { useEffect, useRef, useState } from "react";
import { Button, Input, Form, FormField, Label, FormActions } from "../UI";
import { DateSelect } from "../";

interface IProps {
  onSubmit: (amount: number, date: string) => void;
  onCancel: () => void;
  hasSalarii: boolean;
}
const NewSalariu = ({ onSubmit, onCancel, hasSalarii }: IProps) => {
  const [newSalariuAmount, setNewAvansAmount] = useState(0);
  const [newDate, setNewDate] = useState(new Date().toISOString());

  const salariuInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    salariuInputRef.current!.focus();
  }, []);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newSalariuAmount) return;
    onSubmit(newSalariuAmount, newDate);
  };

  return (
    <>
      <Form onSubmit={submitHandler} mt={12} borders={hasSalarii}>
        <FormField>
          <Label>Suma</Label>
          <Input
            ref={salariuInputRef}
            type="number"
            placeholder="Suma salariului..."
            value={newSalariuAmount || ""}
            onChange={(e) =>
              setNewAvansAmount(Math.abs(Number(e.target.value)))
            }
          />
        </FormField>
        <DateSelect onChange={setNewDate} />
        <FormActions>
          <Button type="submit">Adaugă (lei)</Button>
          <Button type="button" onClick={onCancel}>❌</Button>
        </FormActions>
      </Form>
    </>
  );
};

export default NewSalariu;
