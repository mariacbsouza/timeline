import { useMemo, useState } from "react";

import { timelineItems } from "../timelineItems";

import styles from "./Timeline.module.css";

const TimelineItem = ({ item }) => {
  return (
    <div className={styles.item} title={item.name}>
      {item.name}
    </div>
  );
};

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

  const getItemSpan = (item, dates) => {
    const start = new Date(item.start);
    const end = new Date(item.end);
    let span = 0;
    for (const date of dates) {
      if (
        date.toDateString() >= start.toDateString() &&
        date.toDateString() <= end.toDateString()
      ) {
        span++;
      }
    }
    return span;
  };

  const getLanes = (items) => {
    const lanes = [];
    const sortedItems = [...items].sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    for (const item of sortedItems) {
      let placed = false;
      for (let i = 0; i < lanes.length; i++) {
        if (!isOverlapping(item, lanes[i])) {
          lanes[i].push(item);
          placed = true;
          break;
        }
      }
      if (!placed) {
        lanes.push([item]);
      }
    }
    return lanes;
  };

  const isOverlapping = (newItem, lane) => {
    for (const existingItem of lane) {
      const existingStart = new Date(existingItem.start);
      const existingEnd = new Date(existingItem.end);
      const newStart = new Date(newItem.start);
      const newEnd = new Date(newItem.end);

      if (newStart <= existingEnd && newEnd >= existingStart) {
        return true;
      }
    }
    return false;
  };

  const lanes = getLanes(timelineItems, dates);

  return (
    <>
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
      <div className={styles.body}>
        <div className={styles.grid}>
          {dates.map((_, index) => (
            <div key={index} className={styles.dayColumn} />
          ))}
        </div>
        <div className={styles.lanes}>
          {lanes.map((lane, laneIndex) => (
            <div key={laneIndex} className={styles.lane}>
              {lane.map((item, itemIndex) => {
                const startDayIndex = dates.findIndex(
                  (d) =>
                    d.toDateString() === new Date(item.start).toDateString()
                );
                const span = getItemSpan(item, dates);

                if (startDayIndex === -1) return null;

                return (
                  <div
                    key={itemIndex}
                    className={styles.itemContainer}
                    style={{
                      gridColumnStart: startDayIndex + 1,
                      gridColumnEnd: startDayIndex + 1 + span,
                    }}
                  >
                    <TimelineItem item={item} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
