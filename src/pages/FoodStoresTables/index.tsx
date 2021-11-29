import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function FoodStoresTables() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('food-store-table', {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    }).then(response => {
      
      setRowsFilter(response.data.rows)
    }).catch(err => {
      if (err.status === 401) history.push('/');

      setRowsFilter([]);
    });
  }, [auth, history, setRowsFilter])

  return (
    <div id="page-food-stores-tables">
      <MenuSideBar active={'food-stores-tables'}/>

      <main>
        <FilterTable 
          origin={'food-stores-tables'}
          name={false}
          email={false}
          type={false}
          idFoodStore={true}
          cnpj={false}
          baseUrl={'food-store-table'}
        />

        <DataTable
          number={true}
          seats={true}
          status={true}
          createdAt={true}
          details={true}
          path={'food-stores-tables'}
          rows={rowsFilter as any}
          button={true}
        />
      </main>
    </div>
  )
}

export default FoodStoresTables;