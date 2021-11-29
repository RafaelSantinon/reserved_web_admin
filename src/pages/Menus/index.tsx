import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

function Menus() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);

  useEffect(() => {
    api.get('menu', {
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
    <div id="page-menus">
      <MenuSideBar active={'menus'}/>

      <main>
        <FilterTable 
          origin={'menus'}
          name={false}
          email={false}
          type={true}
          idFoodStore={true}
          cnpj={false}
          baseUrl={'menu'}
        />

        <DataTable
          type={true}
          status={true}
          createdAt={true}
          details={true}
          path={'menus'}
          rows={rowsFilter as any}
          button={true}
        />
      </main>
    </div>
  )
}

export default Menus;