import * as React from "react";
import { Tabs as BTabs, Tab } from "react-bootstrap";

const Tabs = ({ defaultValue, children, className, ...props }) => {
  const [activeKey, setActiveKey] = React.useState(defaultValue);
  
  return (
    <BTabs
      activeKey={activeKey}
      onSelect={(k) => setActiveKey(k)}
      className={className}
      {...props}
    >
      {children}
    </BTabs>
  );
};

const TabsList = ({ children, className, ...props }) => (
  <div className={`nav nav-tabs ${className || ""}`} {...props}>
    {children}
  </div>
);

const TabsTrigger = ({ eventKey, children, className, ...props }) => (
  <Tab
    eventKey={eventKey}
    title={children}
    className={className}
    {...props}
  />
);

const TabsContent = ({ eventKey, children, className, ...props }) => (
  <Tab.Pane eventKey={eventKey} className={className} {...props}>
    {children}
  </Tab.Pane>
);

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};