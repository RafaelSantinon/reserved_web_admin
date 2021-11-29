import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

function Checkouts() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [ rows, setRows ] = useState()

  useEffect(() => {
    api.get('checkout', {
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
    <div id="page-checkouts">
      <MenuSideBar active={'checkouts'}/>

      <main>
        <FilterTable 
          origin={'checkouts'}
          name={true}
          email={true}
          type={true}
          idFoodStore={true}
          cnpj={true}
        />
                
        <DataTable
          status={true}
          totalAmount={true}
          createdAt={true}
          details={true}
          detailsPath={'checkouts/details'}
          rows={rows as any}
        />
      </main>
    </div>
  )
}

export default Checkouts;