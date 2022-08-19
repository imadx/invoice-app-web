import { useInvoiceStore } from "../store";
import styles from "./Heading.module.scss";

export const Heading = () => {
  const { lastUpdatedAt } = useInvoiceStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Invoice</h1>
      <span className={styles.timeId}>
        #{(new Date(lastUpdatedAt) || new Date()).getTime()}
      </span>
    </div>
  );
};
