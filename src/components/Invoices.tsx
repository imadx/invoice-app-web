import { MouseEventHandler } from "react";
import { useInvoiceStore } from "../store";
import { Editable } from "./Editable";
import styles from "./Invoices.module.scss";

export const Invoices = () => {
  const currency = "SGD";

  const { invoices, addInvoice, deleteInvoice, deleteAllInvoices, resetState } =
    useInvoiceStore();

  const sum = invoices.reduce((acc, invoice) => {
    return acc + parseFloat(invoice.amount);
  }, 0);

  const handleOnClickAddItem = () => {
    const newInvoice = {
      description: "",
      client: "",
      amount: "0",
    };

    addInvoice(newInvoice);
  };

  const handleOnClickRemoveItem: MouseEventHandler = (e) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    deleteInvoice(Number(e.target.dataset.index));
  };

  const handleOnClickResetInvoices = () => {
    if (confirm("Are you sure you want to reset the invoices?")) {
      deleteAllInvoices();
    }
  };
  const handleOnClickResetAllFields = () => {
    if (confirm("Are you sure you want to reset all fields?")) {
      resetState();
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Client</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => {
            return (
              <tr key={index}>
                <td className={styles.description}>
                  <span>
                    <Editable
                      type="text"
                      invoiceKey={{ index, field: "description" }}
                      render={(value) => value}
                    />

                    <button
                      className={styles.deleteItem}
                      onClick={handleOnClickRemoveItem}
                      data-index={index}
                    >
                      Delete Invoice Item {index + 1}
                    </button>
                  </span>
                </td>
                <td className={styles.client}>
                  <span>
                    <Editable
                      type="text"
                      invoiceKey={{ index, field: "client" }}
                      render={(value) => value}
                    />
                  </span>
                </td>
                <td className={styles.amount}>
                  <span>
                    <Editable
                      type="text"
                      invoiceKey={{ index, field: "amount" }}
                      render={(value) =>
                        `${currency} ${parseFloat(value).toFixed(2)}`
                      }
                    />
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className={styles.rowTotal}>
            <td className={styles.description}>
              <span>Total</span>
            </td>
            <td className={styles.client}></td>
            <td className={styles.amount}>
              <span>
                {currency} {sum.toFixed(2)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.invoiceActions}>
        <button onClick={handleOnClickAddItem}>Add Invoice Item</button>
        <button
          onClick={() => window.print()}
          disabled={sum <= 0}
          title={sum <= 0 ? "Invoice total is not positive" : undefined}
        >
          Print Invoice
        </button>
        <div></div>
        <button
          className="danger"
          onClick={handleOnClickResetInvoices}
          disabled={invoices.length <= 0}
          title={invoices.length <= 0 ? "No invoice items available" : undefined}
        >
          Reset Invoices
        </button>
        <button className="danger" onClick={handleOnClickResetAllFields}>
          Reset All fields
        </button>
      </div>
    </>
  );
};
