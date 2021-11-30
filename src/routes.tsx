import { createContext, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

import Administrators from './pages/Administrators';
import AdministratorsForm from './pages/AdministratorsForm';

import Checkouts from './pages/Checkouts';
import CheckoutsForm from './pages/CheckoutsForm';

import Clients from './pages/Clients';
import ClientsForm from './pages/ClientsForm';

import FoodStores from './pages/FoodStores';
import FoodStoresForm from './pages/FoodStoresForm';

import FoodStoresTables from './pages/FoodStoresTables';
import FoodStoresTablesForm from './pages/FooStoresTablesForm';

import Menus from './pages/Menus';
import MenusForm from './pages/MenusForm';

import MenusItensForm from './pages/MenusItensForm';

import Reserves from './pages/Reserves';
import ReservesForm from './pages/ReservesForm';

import Orders from './pages/Orders';
import OrdersForm from './pages/OrdersForm';

export const AuthContext = createContext({} as any);
export const RowsFilterContext = createContext({} as any);
export const MenuContext = createContext({} as any);

function Routes() {
  const [auth, setAuth] = useState();
  const [rowsFilter, setRowsFilter] = useState();
  const [menu, setMenu] = useState();

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
            <Route path="/checkouts/details/:id" component={CheckoutsForm} />

            <Route path="/clients" exact component={Clients} />
            <Route path="/clients/details/:id" component={ClientsForm} />

            <Route path="/food-stores" exact component={FoodStores} />
            <Route path="/food-stores/details/:id" component={FoodStoresForm} />
            <Route path="/food-stores/create" component={FoodStoresForm} />

            <Route path="/food-stores-tables" exact component={FoodStoresTables} />
            <Route path="/food-stores-tables/details/:id" component={FoodStoresTablesForm} />
            <Route path="/food-stores-tables/create" component={FoodStoresTablesForm} />

            <MenuContext.Provider value={{menu, setMenu}}>
              <Route path="/menus" exact component={Menus} />
              <Route path="/menus/details/:id" component={MenusForm} />
              <Route path="/menus/create" component={MenusForm} />

              <Route path="/menu-itens/details/:id" component={MenusItensForm} />
              <Route path="/menu-itens/create" component={MenusItensForm} />
            </MenuContext.Provider>

            <Route path="/reserves" exact component={Reserves} />
            <Route path="/reserves/details/:id" component={ReservesForm} />

            <Route path="/orders" exact component={Orders} />
            <Route path="/orders/details/:id" component={OrdersForm} />
            <Route path="/orders/create" component={OrdersForm} />
          </RowsFilterContext.Provider>
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;