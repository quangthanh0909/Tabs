import React, {useState} from "react";
import TabStripNavigation from "./TabStripNavigation";
import TabStripContent from "./TabStripContent";
import classNames from 'classnames';
 
export interface TabStripSelectEventArguments {
  selected: number;
}
 
export interface TabStripProps {
  animation?: boolean;
  selected?: number;
  style?: any;
  tabContentStyle?: any;
  tabPosition?: string;
  tabIndex?: number;
  dir?: string;
  className?: string;
  keepTabsMounted?: boolean;
  onSelect?: (e: TabStripSelectEventArguments) => void;
  children:React.ReactNode;
}
const TabStrip:React.FunctionComponent<TabStripProps>=(props)=>{
  const {keepTabsMounted=true,selected, onSelect :onSelectProps, children} = props;
  const [_element,setElement] = useState<HTMLDivElement | null>();
  const onSelect = (index:number) => {
    if (selected !== index) {
      if (onSelectProps) {
        onSelectProps({
          selected: index
        });
      }
    }
  };

  const tabProps: any = {
    ...props,
    children: React.Children.toArray(children).filter(c => c),
    onSelect: onSelect
  };

  const { tabPosition ="top", tabIndex = 0 } = tabProps;
  const bottom = tabPosition === "bottom";

  const componentClasses = classNames(
    "dls-widget",
    "dls-header",
    "dls-floatwrap",
    "dls-tabstrip",
    {
      ["dls-tabstrip-left"]: tabPosition === "left",
      ["dls-tabstrip-right"]: tabPosition === "right",
      ["dls-tabstrip-bottom"]: tabPosition === "bottom",
      ["dls-tabstrip-top"]: tabPosition === "top"
    },
    props.className
  );
  return (
      <div
        ref={setElement}
        dir={props.dir}
        className={componentClasses}
        style={props.style}
      >
        {!bottom && <TabStripNavigation {...tabProps} tabIndex={tabIndex} />}
        {renderContent(tabProps)}
        {bottom && <TabStripNavigation {...tabProps} tabIndex={tabIndex} />}
      </div>
    );
  }
  const renderContent = (tabProps: any) => {
    const { selected, children, tabContentStyle } = tabProps;
    const childrenCount = React.Children.count(children);
 
    if ((selected as number) < childrenCount && (selected as number) > -1) {
      return (
        <TabStripContent
          index={selected}
          {...tabProps}
          style={tabContentStyle}
        />
      );
    }
    return null;
  };
 export default TabStrip;