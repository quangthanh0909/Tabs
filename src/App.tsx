/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import '@progress/kendo-react-intl';
import '@progress/kendo-react-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';

import TabStripTab from './components/tabstrip/TabStripTab';
import TabIndex from './components/TabContent';
import  TabStrip  from './components/tabstrip/TabStrip';

const tabs = [
  { id:11,title: 'Paris', content: <TabIndex id={11}/>,disabled:false },
  { id:22,title: 'New York City', content: <TabIndex id={22}/> ,disabled:false},
  { id:33,title: 'Tallinn', content: <TabIndex id={33}/> ,disabled:true},

];

const Title = (props:any) => {
  return (
    <span className="k-item k-state-default">
      <span className="k-link">{props.content}</span>
      <span className="k-link" onClick={(event) => {event.stopPropagation();props.onTabRemove(props.id)}}>
        <span className="k-icon k-i-x" />
      </span>
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

  render() {
    return (
      <TabStrip selected={this.state.selected} onSelect={this.handleSelect} keepTabsMounted>
        {
          this.state.tabs.map((item, index) => {
            return <TabStripTab title={<Title id={item.id} content={item.title} onTabRemove={this.removeTab} />} key={item.id}>
              <div>
                <p>{item.content}</p>
              </div>
            </TabStripTab>
          })
        }
      </TabStrip>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


