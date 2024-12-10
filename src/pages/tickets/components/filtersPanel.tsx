import { Checkbox, CurrencyType } from "../../../models";
import classes from "../styles/tickets.module.scss";

interface FilterProps {
  onSelectAll: () => void;
  onCurrencyChange: (currency: CurrencyType) => void;
  onCheckboxChange: (stops: number, onlySelect: boolean) => void;
  selectedCurrency: CurrencyType;
  selected: number[];
  checkboxes: Checkbox[];
}

const FilterPanel = ({
  onSelectAll,
  onCurrencyChange,
  onCheckboxChange,
  selectedCurrency,
  selected,
  checkboxes,
}: FilterProps) => (
  <div className={classes["container-filters"]}>
    <article style={{ width: 250 }} className={classes["card"]}>
      <div className={classes["gap"]}>
        <div className={classes["group-filters"]}>
          <span>Валюта</span>
          <div className={classes["buttons-group"]}>
            {(["RUB", "USD", "EUR"] as CurrencyType[]).map((currency) => (
              <button
                key={currency}
                className={`${classes["btn"]} ${
                  selectedCurrency === currency ? classes["btn__active"] : ""
                }`}
                onClick={() => onCurrencyChange(currency)}
                aria-label={currency}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>

        <div className={classes["group-filters"]}>
          <span>Количество пересадок</span>
          <div className={classes["checkbox-group"]}>
            <label className={classes["checkbox-label"]}>
              <input
                type="checkbox"
                checked={selected.length === checkboxes.length}
                onChange={onSelectAll}
              />
              <div className={classes["checkbox-label-gap"]}>
                <span className={classes["checkbox-label__text"]}>Все</span>
              </div>
            </label>
            {checkboxes.map((checkbox) => {
              return (
                <label
                  key={checkbox.stops}
                  htmlFor={checkbox.name}
                  className={classes["checkbox-label"]}
                >
                  <input
                    id={checkbox.name}
                    type="checkbox"
                    checked={selected.includes(checkbox.stops)}
                    onChange={() => onCheckboxChange(checkbox.stops, false)}
                  />
                  <div className={classes["checkbox-label-gap"]}>
                    <span className={classes["checkbox-label__text"]}>
                      {checkbox.name}
                    </span>
                    <button
                      type="button"
                      className={classes["checkbox-label__btn"]}
                      onClick={() => onCheckboxChange(checkbox.stops, true)}
                    >
                      Только
                    </button>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  </div>
);

export { FilterPanel };
