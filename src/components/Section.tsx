import { ReactNode } from "react";
import styles from "./Section.module.scss";

interface Props {
  title?: string;
  children: ReactNode;
}

export const Section = ({ title, children }: Props) => {
  return (
    <div className={styles.section}>
      {title && <h2 className={styles.heading}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
