import { useEffect, useState } from "react";

import { Checkbox, CurrencyType, Ticket } from "../../models";
import { MOCK_DATA } from "../../utils";
import { FilterPanel } from "./components/filtersPanel";
import { TicketList } from "./components/ticketList";
import classes from "./styles/tickets.module.scss";

const CHECKBOXES: Checkbox[] = [
  { id: 0, name: "Без пересадок", stops: 0 },
  { id: 1, name: "1 пересадка", stops: 1 },
  { id: 2, name: "2 пересадки", stops: 2 },
  { id: 3, name: "3 пересадки", stops: 3 },
];

const mockResponse = new Response(JSON.stringify(MOCK_DATA));
const request = () => Promise.resolve(mockResponse);

const TicketsPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>("RUB");
  const [selected, setSelected] = useState<number[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const filteredTickets = tickets
    .filter((ticket) => !selected.length || selected.includes(ticket.stops))
    .sort((a, b) => a.price - b.price);

  const handleCheckboxChange = (value: number, onlySelect: boolean) => {
    setSelected((prev) =>
      onlySelect
        ? [value]
        : prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSelectAll = () => {
    setSelected((prev) =>
      prev.length === CHECKBOXES.length
        ? []
        : CHECKBOXES.map((option) => option.stops)
    );
  };

  const getTickets = async () => {
    const response = await request();
    const data = await response.json();
    setTickets(data.tickets);
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <main className={classes["container"]}>
      <FilterPanel
        checkboxes={CHECKBOXES}
        onCheckboxChange={handleCheckboxChange}
        onCurrencyChange={setSelectedCurrency}
        onSelectAll={handleSelectAll}
        selected={selected}
        selectedCurrency={selectedCurrency}
      />

      <div className={classes["container-tickets"]}>
        {filteredTickets.map((ticket, index) => (
          <TicketList
            key={index}
            ticket={ticket}
            selectedCurrency={selectedCurrency}
          />
        ))}
      </div>
    </main>
  );
};

export default TicketsPage;
