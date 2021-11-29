// import { useContext } from 'react';
// import { useHistory } from 'react-router';

// import DataTable from '../../components/DataTable'
// import FilterTable from '../../components/FilterTable'
import Form from '../../components/Form'
import MenuSideBar from '../../components/MenuSideBar'

// import api from '../../services/api';

import './styles.css';

// import { AuthContext, RowsFilterContext } from '../../routes'

function AdministratorsForm() {
  // const history = useHistory();
  // const { auth } = useContext(AuthContext);

  // useEffect(() => {
  //   api.get('user?type=1,2,3', {
  //     headers: {
  //       'Authorization': `Bearer ${auth}`
  //     }
  //   }).then(response => {
      
  //     setRowsFilter(response.data.rows)
  //   }).catch(err => {
  //   console.log('err :', err);

  //     if (err.status === 401) history.push('/');
  //   });
  // }, [auth, history, setRowsFilter])

  return (
    <div id="page-user-details">
      <MenuSideBar active={'administrators'}/>

      <main>
        <Form/>
      </main>
    </div>
  )
}

export default AdministratorsForm;