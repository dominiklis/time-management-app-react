import React, { useState } from "react";
import "./Accordion.css";

import { IconContext } from "react-icons";
import { FiChevronUp } from "react-icons/fi";

const Accordion = ({ children, header, color, open }) => {
  const [openAccordion, setOpenAccordion] = useState(open || false);

  const handleLabelClick = () => setOpenAccordion((prev) => !prev);

  let colorWariant = "";
  if (color === "primary") {
    colorWariant = " accordion--primary";
  }
  if (color === "warning") {
    colorWariant = " accordion--warning";
  }

  return (
    <div className={`accordion${colorWariant}`} aria-expanded={openAccordion}>
      <div
        className="accordion__label"
        aria-expanded={openAccordion}
        onClick={handleLabelClick}
      >
        <h2 className="accordion__header">{header}</h2>
        <IconContext.Provider
          value={{
            className: "accordion__icon",
          }}
          aria-expanded={openAccordion}
        >
          <FiChevronUp />
        </IconContext.Provider>
      </div>
      <div className="accordion__content" aria-expanded={openAccordion}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
