/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import '@progress/kendo-react-intl';
import '@progress/kendo-react-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';

import TabStripTab from './components/tabstrip/TabStripTab';
import TabIndex from './components/TabContent';
import  TabStrip  from './components/tabstrip/TabStrip';

import {guid} from './components/tabstrip/util';

import './App.css'
const tabs = [
  { id:1,title: 'Home', content: <TabIndex id={11}/>,disabled:true },
  { id:2,title: 'Title 1', content: <TabIndex id={22}/> ,disabled:false},
  { id:3,title: 'Title 2', content: <TabIndex id={33}/> ,disabled:false},

];

let index = 4;

const Title = (props:any) => {
  return (
    <span className="k-item k-state-default">
      <span className="k-link">{props.content}</span>
      {!props.isDisableClose && <span className="k-link" onClick={(event) => {event.stopPropagation();props.onTabRemove(props.id)}}>
        <span className="k-icon k-i-x" />
      </span>}
    </span>
  )
};

class App extends React.Component {

  state = {
    selected: 0,
    tabs: tabs
  };

  handleSelect = (e:any) => {
    this.setState({ selected: e.selected });
  };

  removeTab = (id:any) => {

    let newTabs = this.state.tabs.filter(item => { return item.id !== id; });
    this.setState({ tabs: newTabs });
  };

  handleOnClick = (event:any) => {
    const id = index++;
    const newTab = {
      id,
      title: ` Title ${id}`,
      content: <TabIndex id={id}/>,
      disabled:false 
    }
    this.setState({tabs:[...this.state.tabs,newTab]})
  }
  

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}> Add Tab</button>
      <TabStrip selected={this.state.selected} onSelect={this.handleSelect} keepTabsMounted>
        {
          this.state.tabs.map((item, index) => {
            return <TabStripTab title={<Title id={item.id} content={item.title} onTabRemove={this.removeTab} isDisableClose={item.disabled} />} key={item.id}>
              <div>
                <p>{item.content}</p>
              </div>
            </TabStripTab>
          })
        }
      </TabStrip>
        </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


