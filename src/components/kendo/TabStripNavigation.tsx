import React from "react";
import TabStripNavigationItem from "./TabStripNavigationItem";
import classNames from 'classnames' 
/**
 * @hidden
 */
const times = (count:any) => Array.apply(null, Array(count));
 
/**
 * The props that are passed to the TabStripNavigation by the TabStrip.
 */

export interface TabStripNavigationProps {
	selected?: number;
	tabIndex?: number;
	onKeyDown?: any;
	onSelect?(idx: number): void;
	children?: React.ReactElement | React.ReactElement<any>[];
}
 const TabStripNavigation: React.FunctionComponent<any> = (props: TabStripNavigationProps) => {
    const { selected, children, onSelect, onKeyDown, tabIndex } = props;
    const tabsCount = React.Children.count(children);
    const childElements: React.ReactNode[] = React.Children.toArray(
        children
    );
    let tabs;
    if (children) {
        tabs = times(tabsCount)
            .map((_, index, array) => ({
                first: index === 0,
                last: index === array.length - 1
            }))
            .map((_, index) => {
                const tabProps = {
                    active: selected === index,
                    disabled: (childElements[index] as any).props.disabled,
                    index,
                    title: (childElements[index] as any).props.title,
                    onSelect
                };
                const key = (childElements[index] as any).key
                return <TabStripNavigationItem key={key} {...tabProps} />;
            });
    }
    const navClasses = classNames("dls-tabstrip-items", "dls-reset");
    return (
            <ul
                className={navClasses}
                role={"tablist"}
                tabIndex={tabIndex}
                onKeyDown={onKeyDown}
            >
                {tabs}
            </ul>
    )



}

export default TabStripNavigation;