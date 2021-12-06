import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function Checkouts() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('checkout', {
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
      <MenuSideBar active={'checkouts'}/>

      <main>
        <FilterTable 
          origin={'checkouts'}
          name={true}
          idFoodStore={true}
          status={true}
          baseUrl={'checkout?'}
        />
                
        <DataTable
          status={true}
          table={true}
          createdAt={true}
          details={true}
          path={'checkouts'}
          rows={rowsFilter as any}
        />
      </main>
    </div>
  )
}

export default Checkouts;