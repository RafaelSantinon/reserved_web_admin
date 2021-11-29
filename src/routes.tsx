import { createContext, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

import Administrators from './pages/Administrators';
import AdministratorsForm from './pages/AdministratorsForm';

import Checkouts from './pages/Checkouts';

import Clients from './pages/Clients';
import ClientsForm from './pages/ClientsForm';

import FoodStores from './pages/FoodStores';

import FoodStoresTables from './pages/FoodStoresTables';

import Menus from './pages/Menus';

export const AuthContext = createContext({} as any )
export const RowsFilterContext = createContext({} as any )

function Routes() {
  const [auth, setAuth] = useState();
  const [rowsFilter, setRowsFilter] = useState();

  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{auth, setAuth}}>
          <RowsFilterContext.Provider value={{rowsFilter, setRowsFilter}}>
            <Route path="/" exact component={Login} />

            <Route path="/administrators" exact component={Administrators} />
            <Route path="/administrators/details/:id" component={AdministratorsForm} />
            <Route path="/administrators/create" component={AdministratorsForm} />

            <Route path="/checkouts" exact component={Checkouts} />
            <Route path="/checkouts/details/:id" component={Checkouts} />

            <Route path="/clients" exact component={Clients} />
            <Route path="/clients/details/:id" component={ClientsForm} />

            <Route path="/food-stores" exact component={FoodStores} />
            <Route path="/food-stores/details/:id" component={FoodStores} />
            <Route path="/food-stores/create" component={FoodStores} />

            <Route path="/food-stores-tables" exact component={FoodStoresTables} />
            <Route path="/food-stores-tables/details/:id" component={FoodStoresTables} />
            <Route path="/food-stores-tables/create" component={FoodStoresTables} />

            <Route path="/menus" exact component={Menus} />
            <Route path="/menus/details/:id" component={Menus} />
            <Route path="/menus/create" component={Menus} />
          </RowsFilterContext.Provider>
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;