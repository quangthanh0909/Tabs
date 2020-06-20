

import React, { FunctionComponent, ReactChildren, ReactChild, ReactElement } from 'react';
import TabStripNavigationItem from "./TabStripNavigationItem";
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import {TabStripProps} from './TabStrip';
import {TabStripNavigationItemProps} from './TabStripNavigationItem';
export interface TabStripSelectEventArguments {
    selected: number;
}
/**
 * Represents the props of the [KendoReact TabStrip component]({% slug overview_tabstrip %}).
 */

export interface TabStripNavigationProps {
    selected?: number;
    tabIndex?: number;
    onKeyDown?: any;
    onSelect?(idx: number): void;
    children?:ReactElement<any>[]
}
const  TabStripNavigation:FunctionComponent<any> = (props:TabStripNavigationProps)=>{
  
    const {selected,onSelect, onKeyDown ,tabIndex,children}  = props;
    const childElements = React.Children.toArray(children) as ReactElement[];
    const elementCount = childElements.length;
    

    return(
        <ul className="k-tabstrip-items k-reset" role='tablist' tabIndex={tabIndex} onKeyDown={onKeyDown}>
            {elementCount && childElements.map((child,index) => {
              const  tabProps = {
                    active: selected === index,
                    disabled: child.props.disabled,
                    index: index,
                    title: child.props.title,
                    onSelect: onSelect
                    }
            return <TabStripNavigationItem key={child.key?child.key:undefined} {...tabProps}/>
            })}
        </ul>
    )

}

export default TabStripNavigation;
