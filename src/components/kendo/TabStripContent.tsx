import * as React from "react";
import * as PropTypes from "prop-types";
// import { Fade } from "../../../animation/src/main";
import { TabStripTabProps } from "./TabStripTab";
import classNames from 'classnames';
 
/**
 * The props that are passed to the TabStripContent by the TabStrip.
 */
export interface TabStripContentProps {
    animation?: boolean;
    selected?: number;
    style?: React.CSSProperties;
    index?: number;
    keepTabsMounted?: boolean;
    children?:React.ReactElement | React.ReactElement[];
}
 
const  TabStripContent:React.FunctionComponent<TabStripContentProps> = (props)=>{
    const { children, selected } = props;
    const selectedTab =
            children &&
            typeof selected === "number" &&
            (React.Children.toArray(children)[selected] as React.ReactElement<
                TabStripTabProps
            >);
            const contentClasses = classNames(
                "dls-content",
                "dls-state-active",
                selectedTab && selectedTab.props.contentClassName
            );
            const renderChild =(
                tab: React.ReactElement<TabStripTabProps>,
                idx: number
            ) => {
                debugger;
                const visible = idx === props.selected;
                const contentProps = {
                    role: "tabpanel",
                    "aria-expanded": true,
                    style: {
                        display: visible ? undefined : "none"
                    }
                };
                const animationStyle = {
                    position: "initial",
                    display: visible ? undefined : "none"
                };
                const key=tab.key || undefined;
                if (tab.props.disabled) {
                    return null;
                }
                return <div {...contentProps} key={key}>
                        {tab.props.children}
                    </div>
            
            }
            const renderContent = (children: React.ReactNode)=>{
                return !props.keepTabsMounted
                    ? renderChild(
                          React.Children.toArray(children)[
                              props.selected as number
                          ] as React.ReactElement<TabStripTabProps>,
                          props.selected as number
                      )
                    : React.Children.map(props.children, (tab, idx) => {
                          return renderChild(
                              tab as React.ReactElement<TabStripTabProps>,
                              idx
                          );
                      });
            }
            return (
                <div className={contentClasses} style={props.style}>
                    {renderContent(children)}
                </div>
            );

}

export default TabStripContent;