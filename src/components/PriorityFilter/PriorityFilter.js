import React from "react";
import Button from "../Button/Button";
import "./PriorityFilter.css";

const PriorityFilter = ({ selected, setSelected }) => {
  const handleClick = (value) => {
    setSelected((prev) => {
      if (selected.includes(value)) {
        const index = prev.indexOf(value);

        const res = [...prev];
        res.splice(index, 1);

        return res;
      }

      const res = [...prev];
      res.push(value);
      return res;
    });
  };

  return (
    <div className="priority-filter">
      <div className="priority-filter__content">
        <h5>filter by priority</h5>
        <div className="priority-filter__buttons">
          <Button
            onClick={() => handleClick(0)}
            color={selected.includes(0) ? "primary" : ""}
          >
            normal
          </Button>
          <Button
            onClick={() => handleClick(1)}
            color={selected.includes(1) ? "primary" : ""}
          >
            importatnt
          </Button>
          <Button
            onClick={() => handleClick(2)}
            color={selected.includes(2) ? "primary" : ""}
          >
            urgent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriorityFilter;
