import React, {useState } from 'react';
import TabStripNavigation from "./TabStripNavigation";
import TabStripContent from "./TabStripContent";
import {Keys} from './util';
import classNames from 'classnames';

export interface TabStripSelectEventArguments {
    selected: string;
}
/**
 * Represents the props of the [KendoReact TabStrip component]({% slug overview_tabstrip %}).
 */
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
}
const  TabStrip:React.FunctionComponent<TabStripProps>=(props)=>{
    const [tabElement,setElement] = useState<HTMLDivElement | null>();
    const {animation=true,tabPosition='top',keepTabsMounted=false,selected,tabIndex} = props;
    const children = React.Children.toArray(props.children);
    const length = React.Children.count(children);
    
    const onSelect = (index:any) => {
        if (props.selected !== index) {
            if (props.onSelect) {
                props.onSelect({
                    selected: index
                });
            }
        }
    }
    const renderContent = (tabProps:any) => {
        var selected = tabProps.selected, children = tabProps.children, tabContentStyle = tabProps.tabContentStyle;
        var childrenCount = React.Children.count(children);
        if (selected < childrenCount && selected > -1) {
            return <TabStripContent index={selected} {...tabProps} style={{...tabContentStyle}}/>
        }
        return null;
    };
    const firstNavigatableTab = () =>{
        // if (children) {
        //     for (var i = 0; i < length; i++) {
        //         if (!children[i].props.disabled) {
        //             return i;
        //         }
        //     }
        // }
    };
    const  lastNavigatableTab = ()=> {
        // var length = React.Children.count(children);
        // if (children) {
        //     for (var i = length - 1; i > 0; i--) {
        //         if (!children[i].props.disabled) {
        //             return i;
        //         }
        //     }
        // }
    };
    const prevNavigatableTab = function () {
        var index = selected ? selected - 1 : -1;
        if (index < 0) {
            return lastNavigatableTab();
        }
        // if (children) {
        //     for (var i = index; i > -1; i--) {
        //         if (!children[i].props.disabled) {
        //             return i;
        //         }
        //         if (i === 0) {
        //             return lastNavigatableTab();
        //         }
        //     }
        // }
    };

    const  nextNavigatableTab = function () {
          const children = React.Children.toArray(props.children);
    const length = React.Children.count(children);
        var index = selected ? selected + 1 : 1;
        var childrenCount = React.Children.count(children);
        if (index >= childrenCount) {
            return  firstNavigatableTab();
        }
        // if (children) {
        //     for (var i = index; i < childrenCount; i++) {
        //         if (!children[i].props.disabled) {
        //             return i;
        //         }
        //         if (i + 1 === childrenCount) {
        //             return  firstNavigatableTab();
        //         }
        //     }
        // }
    };
    const keyBinding = {
        [Keys.left]:()=> prevNavigatableTab(),
        [Keys.right]:()=>nextNavigatableTab(),
        [Keys.down]:()=>nextNavigatableTab(),
        [Keys.up]:()=>prevNavigatableTab(),
        [Keys.home]:()=>0,
        [Keys.end]:()=>React.Children.count(props.children) - 1

    }

    const invertKeys =  (original:any, inverted:any) => {
        var rtl = tabElement && (getComputedStyle(tabElement).direction === 'rtl') || false;
        return rtl ? inverted : original;
    };
    
    const onKeyDown = function (event:any) {
        let handler;
        switch (event.keyCode) {
            case Keys.left:
                handler = keyBinding[invertKeys(Keys.left,Keys.right)];
                break;
            case Keys.right:
                handler = keyBinding[invertKeys(Keys.right,Keys.left)];
                break;
            case Keys.up:
                handler = keyBinding[Keys.up];
                break;
            case Keys.down:
                handler = keyBinding[Keys.down];
                break;
            default:
                break;
        }
        if (handler) {
            event.preventDefault();
            onSelect(handler());
        }
    };
    
    const tabProps = Object.assign({}, props, {onKeyDown: onKeyDown, onSelect: onSelect });
    
    const bottom = tabPosition === 'bottom';

    const componentClasses = classNames('k-widget', 'k-header', 'k-floatwrap', 'k-tabstrip',{'k-tabstrip-left': tabPosition === 'left'},
            {'k-tabstrip-right' : tabPosition === 'right'},
            {'k-tabstrip-bottom': tabPosition === 'bottom'},
            {'k-tabstrip-top': tabPosition === 'top'},
        props.className);
    
        return (<div ref ={setElement} dir={props.dir} className={componentClasses} style={props.style}>
            {!bottom && <TabStripNavigation {...tabProps} tabIndex={tabIndex}/>}
            {renderContent(tabProps)}
            {bottom && <TabStripNavigation {...tabProps} tabIndex={tabIndex}/>}
        </div>)
}

export default TabStrip;
