import React, { useState } from "react";
import "./ExpandableComponent.css";

const ExpandableComponent = ({
  alwaysVisibleComponent,
  componentToBeExpanded,
  passOnClickHandler,
  hoverActiveStyles,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded((prev) => !prev);

  const handleWholeVisibleComponentOnClick = () => {
    if (!passOnClickHandler) handleExpand();
  };

  const propstToChildren = {
    onClick: passOnClickHandler ? handleExpand : null,
  };

  const getAlwaysVisibleStyles = () => {
    let cln = "expandable__always-visible";

    if (!passOnClickHandler) cln += " .expandable__always-visible--pointer";
    if (hoverActiveStyles) cln += " .expandable__always-visible--hover-active";

    return cln;
  };

  return (
    <div className="expandable" aria-expanded={expanded}>
      <div
        className={getAlwaysVisibleStyles()}
        onClick={handleWholeVisibleComponentOnClick}
      >
        {React.Children.map(alwaysVisibleComponent, (child) => {
          return React.cloneElement(child, propstToChildren);
        })}
      </div>
      <div className="expandable__to-be-expanded" aria-expanded={expanded}>
        {componentToBeExpanded}
      </div>
    </div>
  );
};

export default ExpandableComponent;
