import {Store} from 'pullstate';
import axios, { Axios } from 'axios'

interface StoreProps {
  auth: {
    accessToken: string;
  };
}

export const store = new Store<StoreProps>({
  auth: {
    accessToken: '',
  },
});

// import store on other pages to use it

//updating store
store.update(s => {
  s.auth.accessToken = 'newValue';
});

//accessing store
const thingFromStore = store.useState((s) => s.auth.accessToken)
