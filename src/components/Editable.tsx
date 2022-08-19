import { ChangeEvent, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Invoice, InvoiceState, useInvoiceStore } from "../store";
import styles from "./Editable.module.scss";

interface Props {
  invoiceKey?: { index: number; field: keyof Invoice };
  storeKey?: keyof InvoiceState;
  type: "text" | "number" | "date";
  render: (value: any) => ReactNode;
}

export const Editable = ({ storeKey, invoiceKey, type, render }: Props) => {
  const store = useInvoiceStore();

  let value: unknown = null;
  if (storeKey) {
    value = store[storeKey];
  }
  if (invoiceKey) {
    value = store.invoices[invoiceKey.index][invoiceKey.field];
  }
  const setValue = store.setValue;
  const updateInvoice = store.updateInvoice;
  const ref = useRef(null);

  const handleOnClickOutside = () => {
    setIsEditing(false);
  };

  useOnClickOutside(ref, handleOnClickOutside);

  const [isEditing, setIsEditing] = useState(false);

  const handleSetEditable = () => {
    setIsEditing(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (invoiceKey) {
      updateInvoice(invoiceKey.index, invoiceKey.field, e.target.value);
    }

    if (storeKey) {
      setValue(storeKey, e.target.value);
    }
  };

  const getEditInput = () => {
    if (typeof value === "string") {
      return (
        <input
          className={styles.editInput}
          type={type}
          defaultValue={value}
          onChange={handleOnChange}
          placeholder={`Enter value for ${storeKey}`}
        />
      );
    }

    return null;
  };

  return (
    <div ref={ref} className={styles.content} onClick={handleSetEditable}>
      {isEditing ? (
        <div className={styles.editable}>
          <div className={styles.editableContent}>{getEditInput()}</div>
        </div>
      ) : (
        <>{value ? render(value) : "[NOT SET]"}</>
      )}
    </div>
  );
};
