import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fishes: {},
      order: {}
    }
  }
    
  componentWillMount() {
    // this runs right before the <App> is rendered</App>
    // sync data to its own 'name/fishes' path in firebase
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
        context: this,
        state: 'fishes'
      });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      //update our APp component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Something Changed');
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }
  
  
  addFish = (fish) => {
    // update our state
    let currentFishState = {...this.state.fishes}
    // add in our new fish
    let timestamp = Date.now();
    currentFishState[`fish-${timestamp}`] = fish;
    // set state
    this.setState({
      fishes: currentFishState
    });
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({
      fishes: fishes
    });
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder = (key) => {
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    this.setState({order: order});
  }

  removeFish = (key) => {
    const fishes = {...this.state.fishes};
    // cannot use this because we run into issues with firebase
    // delete fishes[key]
    fishes[key] = null;
    this.setState({fishes: fishes});

  }

  removeFromOrder = (key) => {
    console.log('remove', key);
    const order = {...this.state.order};
    delete order[key];
    this.setState({order: order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeItem={this.removeFromOrder} />
        <Inventory loadSamples={this.loadSamples} addFish={this.addFish} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish} storeId={this.props.params.storeId} />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
