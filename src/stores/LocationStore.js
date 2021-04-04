import alt from '../alt';
import LocationActions from '../actions/LocationActions';
import FavoritesStore from '../stores/FavoritesStore';

// Stores automatically emit a change event when an action is dispatched through the store and the action handler ends. In order to suppress the change event you can return false from the action handler.
class LocationStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
      setFavorites: LocationActions.FAVORITE_LOCATION,
    });
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
    // optionally return false to suppress the store change event
    this.errorMessage = null;
  }

  handleFetchLocations() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  //**   Data Dependencies

  resetAllFavorites() {
    this.locations = this.locations.map(location => {
      return {
        id: location.id,
        name: location.name,
        has_favorite: false,
      };
    });
  }

  //   se entendi bem quando é feito um novo pedido dos locations ele apaga os que tem no LocationStore e depois vai comparar com a FavoriteStore para saber se algum dos que recebeu é favorito
  setFavorites(location) {
    //** waitFor
    // Flux comes with this method called waitFor which signals to the dispatcher that this store depends on another store for its data.
    this.waitFor(FavoritesStore);

    var favoritedLocations = FavoritesStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach(location => {
      // find each location in the array
      for (var i = 0; i < this.locations.length; i += 1) {
        // set has_favorite to true
        if (this.locations[i].id === location.id) {
          this.locations[i].has_favorite = true;
          break;
        }
      }
    });
  }
}

export default alt.createStore(LocationStore, 'LocationStore');
