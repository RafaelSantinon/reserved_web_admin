import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function Reserves() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('checkout?status=1', {
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
      <MenuSideBar active={'reserves'}/>

      <main>
        <FilterTable 
          origin={'reserves'}
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
          path={'reserves'}
          rows={rowsFilter as any}
        />
      </main>
    </div>
  )
}

export default Reserves;