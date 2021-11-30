import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function Orders() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('checkout?status=2', {
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
    <div id="page-checkouts">
      <MenuSideBar active={'orders'}/>

      <main>
        <FilterTable 
          origin={'orders'}
          name={true}
          idFoodStore={true}
          status={true}
          baseUrl={'checkout?'}
        />
                
        <DataTable
          status={true}
          totalAmount={true}
          createdAt={true}
          details={true}
          path={'orders'}
          rows={rowsFilter as any}
          button={true}
        />
      </main>
    </div>
  )
}

export default Orders;