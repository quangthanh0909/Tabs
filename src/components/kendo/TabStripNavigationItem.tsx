import * as React from "react";
import classNames from 'classnames';
 
/**
 * The props that are passed by the TabStripNavigation to the TabStripNavigationItem.
 */
export interface TabStripNavigationItemProps {
    active?: boolean;
    disabled?: boolean;
    index: number;
    title?: React.ReactNode | string;
    onSelect?(idx: number): void;
}
const  TabStripNavigationItem:React.FunctionComponent<any> = (props:TabStripNavigationItemProps)=>{
    const { active, disabled, title = "Untitled", index,onSelect} = props;
    
    const onClick = () => {
        if (onSelect) {
            onSelect(index);
        }
    };
        const itemProps = {
            "aria-selected": active,
            role: "tab",
            onClick: !disabled ? onClick : undefined
        };
 
        const itemClasses = classNames({
            ["dls-item"]: true,
            ["dls-state-default"]: !(disabled || active),
            ["dls-state-disabled"]: disabled,
            ["dls-state-active"]: active,
            ["dls-tab-on-top"]: active
        });
 
        return (
            <li {...itemProps} className={itemClasses}>
                <span className="dls-link">{title}</span>
            </li>
        );
  
}

export default TabStripNavigationItem;