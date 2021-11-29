import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

function Menus() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [ rows, setRows ] = useState()

  useEffect(() => {
    api.get('menu', {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    }).then(response => {
      
      setRows(response.data.rows)
    }).catch(err => {

      if (err.status === 401) history.push('/');
    });
  }, [auth, history])

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
        />

        <DataTable
          type={true}
          status={true}
          createdAt={true}
          details={true}
          detailsPath={'menus/details'}
          rows={rows as any}
        />
      </main>
    </div>
  )
}

export default Menus;