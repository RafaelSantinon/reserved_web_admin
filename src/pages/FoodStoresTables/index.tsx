import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

function FoodStoresTables() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [ rows, setRows ] = useState()

  useEffect(() => {
    api.get('food-store-table', {
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
    <div id="page-food-stores-tables">
      <MenuSideBar active={'food-stores-tables'}/>

      <main>
        <FilterTable 
          origin={'food-stores-tables'}
          name={false}
          email={false}
          type={false}
          idFoodStore={true}
          cnpj={false}
        />

        <DataTable
          number={true}
          seats={true}
          status={true}
          createdAt={true}
          details={true}
          detailsPath={'food-stores-tables/details'}
          rows={rows as any}
        />
      </main>
    </div>
  )
}

export default FoodStoresTables;