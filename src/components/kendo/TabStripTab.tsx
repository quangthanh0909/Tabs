import * as React from 'react';
 
/**
 * Represents the props of the TabStrip tabs.
 */
export interface TabStripTabProps {
    
    disabled?: boolean;
    
    children?: React.ReactNode | React.ReactElement
    
    title?: React.ReactNode | string | React.ReactElement;
    
    contentClassName?: string;
}
 
export default class TabStripTab extends React.Component<TabStripTabProps, {}> {
}