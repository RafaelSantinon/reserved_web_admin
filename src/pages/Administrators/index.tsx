import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function Administrators() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('user?type=1,2,3', {
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
    <div id="page-users">
      <MenuSideBar active={'administrators'}/>

      <main>
        <FilterTable 
          origin={'administrators'}
          name={true}
          email={true}
          idFoodStore={true}
          cnpj={false}
          baseUrl={'user?type=1,2,3'}
        />
        
        <DataTable
          name={true}
          email={true}
          status={true}
          type={true}
          createdAt={true}
          details={true}
          path={'administrators'}
          rows={rowsFilter as any}
          button={true}
        />
      </main>
    </div>
  )
}

export default Administrators;