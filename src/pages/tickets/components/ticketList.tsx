import classNames from "classnames";
import britishAirlines from "../../../assets/BA.svg";
import siberiaAirlines from "../../../assets/S7.svg";
import aeroflotAirlines from "../../../assets/SU.svg";
import turkishAirlines from "../../../assets/TK.svg";
import { CarrierCode, CurrencyType, Ticket } from "../../../models";
import { convertPrice, formatDate } from "../../../utils";
import classes from "../styles/tickets.module.scss";

interface TicketListProps {
  ticket: Ticket;
  selectedCurrency: CurrencyType;
}

const mapCarrierToImage: Record<CarrierCode, string> = {
  [CarrierCode.SU]: aeroflotAirlines,
  [CarrierCode.TK]: turkishAirlines,
  [CarrierCode.BA]: britishAirlines,
  [CarrierCode.S7]: siberiaAirlines,
};

const TicketList = ({ ticket, selectedCurrency }: TicketListProps) => {
  return (
    <article className={classes["card"]}>
      <div className={classes["split"]}>
        <div className={classes["buy-ticket"]}>
          <img
            src={
              mapCarrierToImage[
                ticket.carrier as keyof typeof mapCarrierToImage
              ]
            }
            alt={`Logo of ${ticket.carrier}`}
          />
          <button
            onClick={() => console.log(ticket)}
            aria-label={`Buy ticket for ${ticket.origin} to ${ticket.destination}`}
          >
            <span>Купить</span>
            <span>
              {new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: selectedCurrency,
              }).format(convertPrice(ticket.price, selectedCurrency))}
            </span>
          </button>
        </div>

        <div className={classes["hr"]} />

        <div className={classes["flight-information"]}>
          <div className={classes["flight-information__top"]}>
            <time dateTime={ticket.departure_time}>
              {ticket.departure_time}
            </time>
            <span>{ticket.stops} ПЕРЕСАДКА</span>
            <time dateTime={ticket.arrival_time}>{ticket.arrival_time}</time>
          </div>

          <div className={classes["flight-information__bottom"]}>
            <div
              className={classNames(
                classes["split"],
                classes["flight-information__destination"]
              )}
            >
              <span>{`${ticket.origin}, ${ticket.origin_name}`}</span>
              <span>{`${ticket.destination}, ${ticket.destination_name}`}</span>
            </div>
            <div
              className={classNames(
                classes["split"],
                classes["flight-information__arrival"]
              )}
            >
              <time
                dateTime={ticket.departure_date}
                aria-label="Departure time"
              >
                {formatDate(ticket.departure_date, ticket.departure_time)}
              </time>

              <time dateTime={ticket.departure_date} aria-label="Arrival time">
                {formatDate(ticket.departure_date, ticket.departure_time)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export { TicketList };
