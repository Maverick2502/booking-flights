import { CurrencyType } from "../models";

const formatDate = (date: string, time: string) => {
  try {
    const dateTime = new Date(`${date} ${time}`);
    if (isNaN(dateTime.getTime())) {
      throw new Error(`Invalid date/time combination: ${date}, ${time}`);
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("ru-RU", options).format(dateTime);
  } catch (error) {
    console.error(error);
    return "Invalid date/time";
  }
};

const convertPrice = (price: number, currency: CurrencyType): number => {
  const exchangeRates = {
    EUR: 0.011,
    USD: 0.013,
    RUB: 1,
  };
  return price * (exchangeRates[currency] || 1);
};

export { formatDate, convertPrice };
