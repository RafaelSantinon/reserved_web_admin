import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Administrators from './pages/Administrators';
import Checkouts from './pages/Checkouts';
import Clients from './pages/Clients';
import FoodStores from './pages/FoodStores';
import FoodStoresTables from './pages/FoodStoresTables';
import Menus from './pages/Menus';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />

        <Route path="/administrators" component={Administrators} />

        <Route path="/checkouts" component={Checkouts} />

        <Route path="/clients" component={Clients} />

        <Route path="/food-stores" component={FoodStores} />

        <Route path="/food-stores-tables" component={FoodStoresTables} />

        <Route path="/menus" component={Menus} />

      </Switch>
    </BrowserRouter>
  );
}

export default Routes;