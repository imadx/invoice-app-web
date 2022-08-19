import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Invoice {
  description: string;
  client: string;
  amount: string;
}

export interface InvoiceState {
  billedDate: Date;
  billedByName: string;
  billedByAddressLine1: string;
  billedByAddressLine2: string;
  billedToName: string;
  billedToAddressLine1: string;
  billedToAddressLine2: string;
  invoices: Invoice[];
  setValue: (key: keyof InvoiceState, value: any) => void;
  addInvoice: (invoice: Invoice) => void;
  deleteInvoice: (index: number) => void;
  updateInvoice: (index: number, field: keyof Invoice, value: string) => void;
  deleteAllInvoices: () => void;
  resetState: () => void;
}

export const useInvoiceStore = create<InvoiceState>()(
  devtools(
    persist(
      (set) => ({
        invoices: [],
        billedDate: new Date(),
        billedByName: "",
        billedByAddressLine1: "",
        billedByAddressLine2: "",
        billedToName: "",
        billedToAddressLine1: "",
        billedToAddressLine2: "",
        setValue: (key: keyof InvoiceState, value: any) => {
          set(() => ({ [key]: value }));
        },
        updateInvoice: (index: number, field: keyof Invoice, value: string) => {
          set((state) => {
            const invoices = [...state.invoices];
            invoices[index][field] = value;
            return { invoices };
          });
        },
        addInvoice: (invoice: Invoice) => {
          set((state) => ({
            invoices: [...state.invoices, invoice],
          }));
        },
        deleteInvoice: (index: number) => {
          set((state) => ({
            invoices: state.invoices.filter((_, i) => i !== index),
          }));
        },
        deleteAllInvoices: () => {
          set((state) => ({ invoices: [] }));
        },
        resetState: () => {
          set((state) => ({
            invoices: [],
            billedDate: new Date(),
            billedByName: "",
            billedByAddressLine1: "",
            billedByAddressLine2: "",
            billedToName: "",
            billedToAddressLine1: "",
            billedToAddressLine2: "",
          }));
        },
      }),
      {
        name: "invoice-storage",
      },
    ),
  ),
);
