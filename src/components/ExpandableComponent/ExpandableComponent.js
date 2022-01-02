import React, { useEffect, useState } from "react";
import "./ExpandableComponent.css";

const ExpandableComponent = ({
  alwaysVisibleComponent,
  componentToBeExpanded,
  initiallyExpanded,
  passOnClickHandler,
  alwaysExpanded,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (initiallyExpanded || alwaysExpanded) {
      setExpanded(true);
    }
  }, []);

  const handleExpand = () =>
    setExpanded((prev) => {
      if (alwaysExpanded) return true;
      return !prev;
    });

  const handleWholeVisibleComponentOnClick = () => {
    if (!passOnClickHandler) handleExpand();
  };

  const propstToChildren = {
    onClick: passOnClickHandler ? handleExpand : null,
  };

  const getAlwaysVisibleStyles = () => {
    let cln = "expandable__always-visible";

    if (!passOnClickHandler) cln += " expandable__always-visible--pointer";
    if (alwaysExpanded)
      cln += " expandable__always-visible--disable-hover-active";

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
