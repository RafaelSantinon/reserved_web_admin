import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function FoodStores() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('food-store', {
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
    <div id="page-food-stores">
      <MenuSideBar active={'food-stores'}/>

      <main>
        <FilterTable
          origin={'food-stores'}
          name={true}
          email={false}
          type={false}
          cnpj={true}
          baseUrl={'food-store?'}
        />

        <DataTable
          name={true}
          description={true}
          cnpj={true}
          status={true}
          createdAt={true}
          details={true}
          path={'food-stores'}
          rows={rowsFilter as any}
          button={true}
        />        
      </main>
    </div>
  )
}

export default FoodStores;