var alt = require('../alt');

class LocationActions {
  // can be construtor and prototypes
  updateLocations(locations) {
    return locations;
  }

  //   We will add an action called fetchLocations which will fetch the locations and then call updateLocations when it successfully completes. A new action locationsFailed deals with the locations not being available.
  fetchLocations() {
    return dispatch => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      LocationSource.fetch()
        .then(locations => {
          // we can access other actions within our action through `this.actions`
          this.updateLocations(locations);
        })
        .catch(errorMessage => {
          this.locationsFailed(errorMessage);
        });
    };
  }
  locationsFailed(errorMessage) {
    return errorMessage;
  }

  //**   Data Dependencies
  //   Dealing with data dependencies between stores is often a tricky and time consuming endeavour. This is one of the reasons why flux was originally built. Flux comes with this method called waitFor which signals to the dispatcher that this store depends on another store for its data.
  // Say we have a new FavoritesStore where you’ll be able to mark your favorite locations. We want to update the LocationStore only after the FavoriteStore gets its update.
  favoriteLocation(locationId) {
    this.dispatch(locationId);
  }
}

module.exports = alt.createActions(LocationActions);
