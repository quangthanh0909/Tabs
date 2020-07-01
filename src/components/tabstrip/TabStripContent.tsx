import React, { FunctionComponent, ReactChildren, ReactElement, useMemo } from 'react';
import classNames from 'classnames';
import {guid} from '../util';



export interface TabStripContentProps {
    animation?: boolean;
    selected?: number;
    style?: any;
    index?: number;
    keepTabsMounted?: boolean;
    children:ReactElement<any>[];
}
const  TabStripContent:FunctionComponent<any> = (props)=>{

    const {animation,selected,style, index ,keepTabsMounted,children}  = props;
    const contentId = guid();
    // const childFactory = (child) => {
    //     return React.cloneElement(child, Object.assign({}, child.props, { in: child.props.children.props.id === String(contentId + props.selected) }));
    // }

    const selectedTab = children && typeof selected === 'number' && 
            React.Children.toArray(children)[selected] as any;
    
    const contentClasses = classNames('k-content', 'k-state-active', selectedTab.props.contentClassName);

    
    const renderContent = (children:ReactElement<any>[]) => {
        return keepTabsMounted?
            // ? renderChild(React.Children.toArray(children)[selected],selected)
            React.Children.map(children, function (tab, idx) {
                const id=tab.key as string;
                return <ChildContent visible={selected===idx} tab={tab} id={id}/>;
            }):null;
    };

    

    return(
        <div className={contentClasses}>
            {renderContent(children)}
        </div>
    )
}
interface ChildProps {
    tab:ReactElement<any>;
    visible:boolean;
    id:string;
}

const ChildContent:React.FunctionComponent<ChildProps> = ({tab,visible,id}) => {
    var contentProps = {
        'role': 'tabpanel',
        'aria-expanded': true,
        'style': {
            'display': visible ? undefined : 'none'
        }
    };
    var animationStyle = {
        position: 'initial',
        display: visible ? undefined : 'none'
    };
    const renderElement = useMemo(() => {
        if (tab.props.disabled) {
            return null;
        }
        return (
            <React.Fragment>
                {tab.props.children}
            </React.Fragment>
        )
    },[tab.props.children])
    
    return (
        <div {...contentProps} key={tab.key?tab.key:undefined}>
           {renderElement}
        </div>
    )        
};

export default TabStripContent;
