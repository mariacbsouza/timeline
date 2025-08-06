import { useMemo, useState } from "react";
import { timelineItems } from "../timelineItems";
import styles from "./Timeline.module.css";

export function Timeline() {
  const [startDate, setStartDate] = useState(new Date(timelineItems[0].start));

  const dates = useMemo(() => {
    const dates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 30; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, [startDate]);

  const handleNext = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 30);
    setStartDate(newStartDate);
  };

  const handlePrevious = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 30);
    setStartDate(newStartDate);
  };

  const renderDay = (date) => {
    return date.getDate().toString().padStart(2, "0");
  };

  const renderDayOfWeekName = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "narrow" });
  };

  let lastMonth = -1;
  const renderMonthAndYear = (date) => {
    const currentMonth = date.getMonth();
    if (currentMonth !== lastMonth) {
      lastMonth = currentMonth;
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.toLocaleDateString("en-US", { year: "numeric" });
      return <strong>{`${monthName} ${year}`}</strong>;
    }
    return null;
  };

  return (
    <div className={styles.header}>
      <button onClick={handlePrevious} className={styles.headerNavigation}>
        {"<"}
      </button>
      <div styles={styles.headerMain}>
        <div className={styles.dateRow}>
          {dates.map((date, index) => (
            <div key={index} className={styles.date}>
              {renderMonthAndYear(date)}
            </div>
          ))}
        </div>
        <div className={styles.dayRow}>
          {dates.map((date, index) => (
            <div key={index} className={styles.day}>
              <strong>{renderDayOfWeekName(date)}</strong>
              {renderDay(date)}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleNext} className={styles.headerNavigation}>
        {">"}
      </button>
    </div>
  );
}
