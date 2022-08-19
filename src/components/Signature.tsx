import { Editable } from "./Editable";
import styles from "./Signature.module.scss";

export const Signature = () => {
  return (
    <div className={styles.container}>
      <div className={styles.signature}>
        <Editable
          type="text"
          storeKey="billedByName"
          render={(value) => value}
        />
      </div>
      <div className={styles.name}>
        <Editable
          type="text"
          storeKey="billedByName"
          render={(value) => value}
        />
      </div>
    </div>
  );
};
