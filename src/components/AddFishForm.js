import React, { Component } from 'react';

class AddFishForm extends Component {
  createFish = (e) => {
    e.preventDefault();
    console.log('gonna make some fish');
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }

    this.props.addFish(fish);
    this.fishForm.reset();
  }

  // createFish(event) {
  //   event.preventDefault();
  //   console.log('gonna make some fish');
  // }

  render() {
    return (
      <div>
        <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish} >
          <input ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
          <input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
          <select ref={(input) => this.status = input}>
            <option value="available">Fresh</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <input ref={(input) => this.desc = input} type="text" placeholder="Fish Desc" />
          <input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
          <button type="submit">+ Add Item</button>
        </form>
      </div>
    );
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;