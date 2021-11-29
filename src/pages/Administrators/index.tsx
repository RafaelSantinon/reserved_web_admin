import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

function Administrators() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [ rows, setRows ] = useState()

  useEffect(() => {
    api.get('user?type=1,2,3', {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    }).then(response => {
      
      setRows(response.data.rows)
    }).catch(err => {
    console.log('err :', err);

      if (err.status === 401) history.push('/');
    });
  }, [auth, history])

  return (
    <div id="page-users">
      <MenuSideBar active={'administrators'}/>

      <main>
        <FilterTable 
          origin={'administrators'}
          name={true}
          email={true}
          type={true}
          idFoodStore={true}
          cnpj={false}
        />
        
        <DataTable
          name={true}
          email={true}
          type={true}
          status={true}
          createdAt={true}
          details={true}
          detailsPath={'administrators/details'}
          rows={rows as any}
        />
      </main>
    </div>
  )
}

export default Administrators;