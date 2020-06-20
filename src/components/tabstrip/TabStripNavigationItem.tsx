

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';



export interface TabStripNavigationItemProps {
    active?: boolean;
    disabled?: boolean;
    index: number;
    title?: React.ReactNode;
    onSelect?(idx: number): void;
}
const  TabStripNavigationItem:FunctionComponent<TabStripNavigationItemProps> = (props)=>{

    const {active,disabled,index, title ,onSelect}  = props;

    const onClick = () => {
        if (onSelect) {
            onSelect(index);
        }}
    
        const itemProps = {
            'aria-selected': active,
            'role': 'tab',
            onClick: !disabled ? onClick : undefined
        };
        const itemClasses = classNames('k-item',{'k-state-default': !(disabled || active)},
            {'k-state-disabled': disabled},
             {'k-state-active' : active},{'k-tab-on-top': active});

    return(
        <li {...itemProps} className={itemClasses}>
            <span className="k-link">{title}</span>
        </li>
    )
}

export default TabStripNavigationItem;