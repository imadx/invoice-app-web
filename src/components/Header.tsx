import { format } from "date-fns";
import { useInvoiceStore } from "../store";

export const Header = () => {
  const { billedDate, billedByName } = useInvoiceStore();

  document.title = `${billedByName} - ${format(
    new Date(billedDate),
    "MMMM, yyyy",
  )}`;

  return null;
};
