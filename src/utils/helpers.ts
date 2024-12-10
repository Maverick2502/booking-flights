import { CurrencyType } from "../models";

const exchangeRates = {
  EUR: 0.011,
  USD: 0.013,
  RUB: 1,
};

const formatDate = (date: string): string => {
  try {
    // TODO
    // We are working with this formmat: "12.05.18"
    // Need to bring to this one: "12 мая 2018 г., сб"
    const [day, month, year] = date.split(".").map(Number);

    const formattedDate = new Date(Date.UTC(2000 + year, month - 1, day));

    if (isNaN(formattedDate.getTime())) {
      throw new Error(`Invalid date: ${date}`);
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDateString = new Intl.DateTimeFormat(
      "ru-RU",
      options
    ).format(formattedDate);

    const weekday = new Intl.DateTimeFormat("ru-RU", {
      weekday: "short",
    }).format(formattedDate);

    return `${formattedDateString}, ${weekday}`;
  } catch (error) {
    console.error(error);
    return "Invalid date";
  }
};

const convertPrice = (price: number, currency: CurrencyType): number => {
  return price * (exchangeRates[currency] || 1);
};

export { convertPrice, formatDate };
