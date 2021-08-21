import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './src/navigation/rootNavigator';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};
export default App;
