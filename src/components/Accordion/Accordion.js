import React, { useState } from "react";
import "./Accordion.css";

import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

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
        <IconContext.Provider
          value={{
            className: "accordion__icon",
          }}
          aria-expanded={openAccordion}
        >
          <FiChevronRight />
        </IconContext.Provider>
        <h2 className="accordion__header">{header}</h2>
      </div>
      <div className="accordion__content" aria-expanded={openAccordion}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
