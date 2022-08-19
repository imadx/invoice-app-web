import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Invoice {
  description: string;
  client: string;
  amount: string;
}

export interface InvoiceState {
  lastUpdatedAt: Date;
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
        lastUpdatedAt: new Date(),
        invoices: [],
        billedDate: new Date(),
        billedByName: "",
        billedByAddressLine1: "",
        billedByAddressLine2: "",
        billedToName: "",
        billedToAddressLine1: "",
        billedToAddressLine2: "",
        setValue: (key: keyof InvoiceState, value: any) => {
          set(() => ({ [key]: value, lastUpdatedAt: new Date() }));
        },
        updateInvoice: (index: number, field: keyof Invoice, value: string) => {
          set((state) => {
            const invoices = [...state.invoices];
            invoices[index][field] = value;
            return { invoices, lastUpdatedAt: new Date() };
          });
        },
        addInvoice: (invoice: Invoice) => {
          set((state) => ({
            invoices: [...state.invoices, invoice],
            lastUpdatedAt: new Date(),
          }));
        },
        deleteInvoice: (index: number) => {
          set((state) => ({
            invoices: state.invoices.filter((_, i) => i !== index),
            lastUpdatedAt: new Date(),
          }));
        },
        deleteAllInvoices: () => {
          set((state) => ({ invoices: [], lastUpdatedAt: new Date() }));
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
            lastUpdatedAt: new Date(),
          }));
        },
      }),
      {
        name: "invoice-storage",
      },
    ),
  ),
);
