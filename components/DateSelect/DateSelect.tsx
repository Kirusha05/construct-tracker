import { useEffect, useState } from "react";
import { FormField, Input, Label } from "../UI";
import { DateInputs } from "./DateSelect.style";

const formatDate = (date: number) => {
  return date.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

interface IProps {
  onChange: (date: string) => void;
}

const DateSelect = ({ onChange }: IProps) => {
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const newDate = new Date();
    newDate.setFullYear(year, month - 1, day);
    onChange(newDate.toISOString());
  }, [day, month, year, onChange]);

  return (
    <FormField>
      <Label>Data</Label>
      <DateInputs>
        <Input
          value={formatDate(day)}
          onChange={(e) => setDay(+e.target.value)}
          type="number"
          min="1"
          max="31"
          placeholder="Ziua"
        />
        <Input
          value={formatDate(month)}
          onChange={(e) => setMonth(+e.target.value)}
          type="number"
          min="1"
          max="12"
          placeholder="Luna"
        />
        <Input
          value={year}
          onChange={(e) => setYear(+e.target.value)}
          type="number"
          min="2015"
          max={new Date().getFullYear()}
          placeholder="Anul"
        />
      </DateInputs>
    </FormField>
  );
};

export default DateSelect;
