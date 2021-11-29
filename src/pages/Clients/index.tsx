import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function Clients() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('user?type=4', {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    }).then(response => {
      
      setRowsFilter(response.data.rows)
    }).catch(err => {

      if (err.status === 401) history.push('/');
    });
  }, [auth, history, setRowsFilter])

  return (
    <div id="page-users">
      <MenuSideBar active={'clients'}/>

      <main>
        <FilterTable 
          origin={'clients'}
          name={true}
          email={true}
          idFoodStore={false}
          cnpj={false}
          baseUrl={'user?type=4'}
        />

        <DataTable
          name={true}
          email={true}
          cellphone={true}
          bornAt={true}
          status={true}
          createdAt={true}
          details={true}
          detailsPath={'checkouts/details'}
          rows={rowsFilter as any}
        />
      </main>
    </div>
  )
}

export default Clients;