import { useEffect, useRef, useState } from "react";
import { Button, Form, FormActions, FormField, Input, Label } from "../UI";
import { CursulCurent, CurrencySelect, CurrencyButton } from "./NewAvans.style";
import { Currency, IExchange } from "../../types";
import { DateSelect } from "../";
import { roundAmount } from "../../utils";
import { AddAvans } from "./Avansuri";

interface IProps {
  onSubmit: AddAvans;
  onCancel: () => void;
  exchangeRates: IExchange;
}

const currencyMap = {
  eur: "€",
  mdl: "lei",
  usd: "$",
};

const NewAvans = ({ onSubmit, onCancel, exchangeRates }: IProps) => {
  const [newAvansAmount, setNewAvansAmount] = useState(0);
  const [currency, setCurrency] = useState<Currency>("eur");
  const [newDate, setNewDate] = useState(new Date().toISOString());
  const [customRates, setCustomRates] = useState(exchangeRates);

  const avansInputRef = useRef<HTMLInputElement>(null);
  const exchangeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    avansInputRef.current!.focus();
  }, [currency]);

  const amountInMDL =
    currency !== "mdl"
      ? roundAmount(newAvansAmount * customRates[currency])
      : newAvansAmount;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newAvansAmount) return;
    onSubmit(newAvansAmount, currency, amountInMDL, newDate);
  };

  const selectedSymbol = currencyMap[currency];

  return (
    <>
      <Form onSubmit={submitHandler}>
        <FormField>
          <Label>Suma</Label>
          <Input
            ref={avansInputRef}
            type="number"
            placeholder="Suma avansului..."
            value={newAvansAmount || ""}
            onChange={(e) =>
              setNewAvansAmount(Math.abs(Number(e.target.value)))
            }
          />
        </FormField>
        <FormField>
          <Label>Valuta</Label>
          <CurrencySelect>
            <CurrencyButton
              type="button"
              selected={currency === "eur"}
              onClick={() => setCurrency("eur")}
            >
              €
            </CurrencyButton>
            <CurrencyButton
              type="button"
              selected={currency === "usd"}
              onClick={() => setCurrency("usd")}
            >
              $
            </CurrencyButton>
            <CurrencyButton
              type="button"
              selected={currency === "mdl"}
              onClick={() => setCurrency("mdl")}
            >
              MDL
            </CurrencyButton>
          </CurrencySelect>
        </FormField>
        {currency !== "mdl" && (
          <FormField>
            <Label>Cursul</Label>
            <Input
              ref={exchangeInputRef}
              type="number"
              placeholder="Cursul..."
              value={customRates[currency] || ""}
              onChange={(e) =>
                setCustomRates((prev) => ({
                  ...prev,
                  [currency]: Math.abs(Number(e.target.value)),
                }))
              }
            />
          </FormField>
        )}
        <DateSelect onChange={setNewDate} />
        <FormActions>
          <Button type="submit">Adaugă ({selectedSymbol})</Button>
          <Button type="button" onClick={onCancel}>
            ❌
          </Button>
        </FormActions>
      </Form>
      {currency !== "mdl" && (
        <CursulCurent>
          {currency === "eur" && (
            <>
              <span>€1 = {customRates.eur} lei</span>
              <span>
                €{newAvansAmount} = {amountInMDL} lei
              </span>
            </>
          )}
          {currency === "usd" && (
            <>
              <span>$1 = {customRates.usd} lei</span>
              <span>
                ${newAvansAmount} = {amountInMDL} lei
              </span>
            </>
          )}
        </CursulCurent>
      )}
    </>
  );
};

export default NewAvans;
