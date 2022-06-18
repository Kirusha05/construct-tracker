import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExpenseType,
  IAvans,
  IExpense,
  IMuncitor,
  IProject,
  ISalariu,
} from "../types";
import { roundAmount, EMPTY_PROJECT } from "../utils";
import { HYDRATE } from "next-redux-wrapper";

const projectSlice = createSlice({
  name: "project",
  initialState: EMPTY_PROJECT,
  reducers: {
    setProject(_, action: PayloadAction<IProject>) {
      const newProject = { ...action.payload };
      // Empty arrays aren't accepted by Firebase DB, so implicitly set empty "salarii" in the store
      for (let worker of newProject.workers) {
        if (!worker.salarii) worker.salarii = [];
      }
      return newProject;
    },
    setProjectName(state, action: PayloadAction<string>) {
      const newName = action.payload;
      state.name = newName;
    },
    addAvans(state, action: PayloadAction<IAvans>) {
      const avans = action.payload;

      state.avansuri.push(avans);

      const details = state.details;
      details.totalCredit = roundAmount(
        details.totalCredit + avans.amountInMDL
      );
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );
    },
    deleteAvans(state, action: PayloadAction<string>) {
      const avansID = action.payload;

      const avansIdx = state.avansuri.findIndex(
        (avans) => avans.id === avansID
      );
      const avans = state.avansuri[avansIdx];
      const details = state.details;

      details.totalCredit = roundAmount(
        details.totalCredit - avans.amountInMDL
      );
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );

      state.avansuri.splice(avansIdx, 1);
    },
    addExpense(
      state,
      action: PayloadAction<{ newExpense: IExpense; type: ExpenseType }>
    ) {
      const { newExpense, type } = action.payload;
      state[type].push(newExpense);

      const details = state.details;
      details.usedCredit = roundAmount(
        details.usedCredit + newExpense.totalPrice
      );
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );
    },
    editExpense(
      state,
      action: PayloadAction<{ newExpense: IExpense; type: ExpenseType }>
    ) {
      const { newExpense, type } = action.payload;
      let existingIdx = state[type].findIndex(
        (item) => item.id === newExpense.id
      );
      let existingAchizitie = state[type][existingIdx];

      const details = state.details;
      details.usedCredit = roundAmount(
        details.usedCredit -
          existingAchizitie.totalPrice +
          newExpense.totalPrice
      );
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );

      state[type][existingIdx] = newExpense;
    },
    deleteExpense(
      state,
      action: PayloadAction<{ expenseID: string; type: ExpenseType }>
    ) {
      const { expenseID, type } = action.payload;
      const expenseIdx = state[type].findIndex(
        (expense) => expense.id === expenseID
      );
      const expense = state[type][expenseIdx];
      const details = state.details;

      details.usedCredit = roundAmount(details.usedCredit - expense.totalPrice);
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );
      state[type].splice(expenseIdx, 1);
    },
    addWorker(state, action: PayloadAction<IMuncitor>) {
      const newWorker = action.payload;
      state.workers.push(newWorker);
    },
    deleteWorker(state, action: PayloadAction<string>) {
      const workerID = action.payload;
      const workerIdx = state.workers.findIndex(
        (worker) => worker.id === workerID
      );

      const workerSalarii = state.workers[workerIdx].salarii || [];
      const salariiTotal = workerSalarii.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );

      const details = state.details;
      details.usedCredit = roundAmount(details.usedCredit - salariiTotal);
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );
      state.workers.splice(workerIdx, 1);
    },
    addSalariu(
      state,
      action: PayloadAction<{ salariu: ISalariu; workerID: string }>
    ) {
      const { salariu, workerID } = action.payload;

      const worker = state.workers.find((worker) => worker.id === workerID)!;
      worker.salarii.push(salariu);

      const details = state.details;
      details.usedCredit = roundAmount(details.usedCredit + salariu.amount);
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );
    },
    deleteSalariu(
      state,
      action: PayloadAction<{ salariuID: string; workerID: string }>
    ) {
      const { salariuID, workerID } = action.payload;

      const worker = state.workers.find((worker) => worker.id === workerID)!;
      const salariuIdx = worker.salarii.findIndex(
        (salariu) => salariu.id === salariuID
      );
      const salariu = worker.salarii[salariuIdx];
      const details = state.details;

      details.usedCredit = roundAmount(details.usedCredit - salariu.amount);
      details.remainingCredit = roundAmount(
        details.totalCredit - details.usedCredit
      );
      worker.salarii.splice(salariuIdx, 1);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.project,
      };
    },
  },
});

export const {
  setProject,
  setProjectName,
  addAvans,
  deleteAvans,
  addExpense,
  editExpense,
  deleteExpense,
  addWorker,
  deleteWorker,
  addSalariu,
  deleteSalariu
} = projectSlice.actions;
export default projectSlice.reducer;
