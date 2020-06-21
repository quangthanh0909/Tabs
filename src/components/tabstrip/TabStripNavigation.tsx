import React, { FunctionComponent, ReactChildren, ReactChild, ReactElement, useState, useEffect } from 'react';
import TabStripNavigationItem from './TabStripNavigationItem';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { TabStripProps } from './TabStrip';
import { TabStripNavigationItemProps } from './TabStripNavigationItem';
export interface TabStripSelectEventArguments {
	selected: number;
}
/**
 * Represents the props of the [KendoReact TabStrip component]({% slug overview_tabstrip %}).
 */

export interface TabStripNavigationProps {
	selected?: number;
	tabIndex?: number;
	onKeyDown?: (e: any) => void;
	onSelect?(idx: number): void;
	children?: ReactElement<any>[];
}
interface ScrollParamsProps {
    scrollLeft?:boolean;
    scrollRight?:boolean;
}
const TabStripNavigation: FunctionComponent<any> = (props: TabStripNavigationProps) => {
	const [ tabElement, setTabElement ] = useState<HTMLUListElement | null>();
	const [ showArrow, setShowError ] = useState(false);
	const [ scrollParams, setScrollParams ] = useState<ScrollParamsProps>({});

	const { selected, onSelect, onKeyDown, tabIndex, children } = props;
	const childElements = React.Children.toArray(children) as ReactElement[];
	const elementCount = childElements.length;
	useEffect(
		() => {
			if (tabElement) {
                handleMutationScroll();
				if ((tabElement.clientWidth - 86) / elementCount < 88) {
					setShowError(true);
				} else {
					if (showArrow) setShowError(false);
				}
			}
		},
		[ elementCount ]
    );
    
    const handleLeftMove = (event:any) => {
        event.stopPropagation();
        tabElement?.scrollBy(-88,0);
    }
    
    const handleRightMove = (event:any) => {
        event.stopPropagation();
        tabElement?.scrollBy(88,0);
    }

    const handleMutationScroll = () => {
        const {clientWidth,scrollWidth,scrollLeft} = tabElement as HTMLUListElement;
        const firstElement = document.querySelector('.k-tabstrip-items li:first-child') as HTMLElement;
        firstElement.style.left = scrollLeft+"px";
        
        setScrollParams({scrollLeft:scrollLeft>0,scrollRight:scrollWidth>clientWidth+scrollLeft});
    }
    
    const handleOnScroll = () => {
        handleMutationScroll();
    }
    

	return (
            <div className="dls-tabstrip-navigaion-wrapper">
                {scrollParams.scrollLeft && <div className="arrow arrow-left" onClick={handleLeftMove}>Arrow Left</div>}

			<ul
				className="k-tabstrip-items k-reset"
				role="tablist"
				tabIndex={tabIndex}
				onKeyDown={onKeyDown}
                ref={setTabElement}
                onScroll={handleOnScroll}
			>
				{elementCount &&
					childElements.map((child, index) => {
						const tabProps = {
							active: selected === index,
							disabled: child.props.disabled,
							index: index,
							title: child.props.title,
							onSelect: onSelect
						};
						return <TabStripNavigationItem key={child.key ? child.key : undefined} {...tabProps} />;
					})}
			</ul>
                {scrollParams.scrollRight && <div className="arrow arrow-right" onClick={handleRightMove}>Arrow Right</div >}
            </div>
	);
};

export default TabStripNavigation;
