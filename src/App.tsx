import { useInvoiceStore } from "./store";
import { Heading } from "./components/Heading";
import { Section } from "./components/Section";
import { Invoices } from "./components/Invoices";
import { Signature } from "./components/Signature";
import { Artwork } from "./components/Artwork";
import { Editable } from "./components/Editable";
import { format } from "date-fns";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Artwork />
      <Heading />
      <Section>
        <Editable
          type="date"
          storeKey="billedDate"
          render={(value) => format(new Date(value), "MMMM, yyyy")}
        />
        <Editable
          type="text"
          storeKey="billedByName"
          render={(value) => value}
        />
      </Section>
      <Section title="Billed by">
        <Editable
          type="text"
          storeKey="billedByName"
          render={(value) => value}
        />
        <Editable
          type="text"
          storeKey="billedByAddressLine1"
          render={(value) => value}
        />
        <Editable
          type="text"
          storeKey="billedByAddressLine2"
          render={(value) => value}
        />
      </Section>

      <Section title="Billed to">
        <Editable
          type="text"
          storeKey="billedToName"
          render={(value) => value}
        />
        <Editable
          type="text"
          storeKey="billedToAddressLine1"
          render={(value) => value}
        />
        <Editable
          type="text"
          storeKey="billedToAddressLine2"
          render={(value) => value}
        />
      </Section>

      <Section title="Billed date">
        <Editable
          type="date"
          storeKey="billedDate"
          render={(value) => format(new Date(value), "MMMM dd, yyyy")}
        />
      </Section>

      <Section>
        <Invoices />
      </Section>

      <Signature />
    </div>
  );
}

export default App;
