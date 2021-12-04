import React, { useState } from "react";
import "./Accordion.css";

import { IconContext } from "react-icons";
import { FiChevronUp } from "react-icons/fi";

const Accordion = ({ children, header, headerColor, hidden }) => {
  const [hideContent, setHideContent] = useState(hidden || false);

  const handleLabelClick = () => setHideContent((prev) => !prev);

  let headerWariant = "";
  if (headerColor === "primary") {
    headerWariant = " accordion__header--primary";
  }
  if (headerColor === "warning") {
    headerWariant = " accordion__header--warning";
  }

  return (
    <div className={`accordion${hideContent ? " accordion--hidden" : ""}`}>
      <div className="accordion__label" onClick={handleLabelClick}>
        <h2 className={`accordion__header${headerWariant}`}>{header}</h2>
        <IconContext.Provider
          value={{ className: `accordion__icon${headerWariant}` }}
        >
          <FiChevronUp />
        </IconContext.Provider>
      </div>
      <div className="accordion__content">{children}</div>
    </div>
  );
};

export default Accordion;
