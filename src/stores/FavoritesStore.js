var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class FavoritesStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      addFavoriteLocation: LocationActions.FAVORITE_LOCATION,
    });
  }

  addFavoriteLocation(location) {
    this.locations.push(location);
  }
}

export default alt.createStore(FavoritesStore, 'FavoritesStore');
