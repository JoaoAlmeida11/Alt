import React from 'react';
import LocationStore from '../stores/LocationStore';
import LocationActions from '../actions/LocationActions';

// Presentational and Container Components - https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
class Locations {
  getInitialState() {
    return LocationStore.getState();
  }

  componentDidMount() {
    LocationStore.listen(this.onChange);

    LocationActions.fetchLocations();
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    //   error
    if (this.state.errorMessage) {
      return <div>Something is wrong</div>;
    }
    // spinner
    if (!this.state.locations.length) {
      return (
        <div>
          <img src="/my-cool-spinner.gif" alt="loader" />
        </div>
      );
    }

    return (
      <ul>
        {this.state.locations.map(location => {
          return <li>{location.name}</li>;
        })}
      </ul>
    );
  }
}

export default Locations;
