import React, { useState } from "react";
import "./Accordion.css";

import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

const Accordion = ({ children, header, color, open }) => {
  const [openAccordion, setOpenAccordion] = useState(open || false);

  const handleLabelClick = () => setOpenAccordion((prev) => !prev);

  const getAccordionStyle = () => {
    let cln = "accordion";

    if (color === "primary") cln += " accordion--primary";
    else if (color === "secondary") cln += " accordion--secondary";
    else if (color === "warning") cln += " accordion--warning";

    return cln;
  };

  return (
    <div className={getAccordionStyle()} aria-expanded={openAccordion}>
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
