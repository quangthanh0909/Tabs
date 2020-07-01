

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
        const itemClasses = classNames('dls-item',{'dls-state-default': !(disabled || active)},
            {'dls-state-disabled': disabled},
             {'dls-state-active' : active},{'dls-tab-on-top': active});

    return(
        <li {...itemProps} className={itemClasses}>
            <span className="dls-link">{title}</span>
        </li>
    )
}

export default TabStripNavigationItem;