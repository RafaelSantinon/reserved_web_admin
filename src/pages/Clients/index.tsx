import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

function Clients() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [ rows, setRows ] = useState()

  useEffect(() => {
    api.get('user?type=4', {
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
    <div id="page-users">
      <MenuSideBar active={'clients'}/>

      <main>
        <FilterTable 
          origin={'clients'}
          name={true}
          email={true}
          type={true}
          idFoodStore={false}
          cnpj={false}
        />

        <DataTable
          name={true}
          email={true}
          cellphone={true}
          bornAt={true}
          type={true}
          status={true}
          createdAt={true}
          details={true}
          detailsPath={'checkouts/details'}
          rows={rows as any}
        />
      </main>
    </div>
  )
}

export default Clients;