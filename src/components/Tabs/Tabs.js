import React, { useState } from "react";
import "./Tabs.css";

import TabLabel from "./TabLabel";

const Tabs = ({ content }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__labels">
        {content.map((el, index) => (
          <TabLabel
            key={`label-${el.label}-${index}`}
            label={el.label}
            onClick={() => setActiveTabIndex(index)}
            active={activeTabIndex === index}
            singleTab={content.length === 1}
          />
        ))}
      </div>
      <div className="tabs__content">
        {content.map((el, index) => {
          if (activeTabIndex === index)
            return <div key={`content-${el.label}-${index}`}>{el.content}</div>;
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
