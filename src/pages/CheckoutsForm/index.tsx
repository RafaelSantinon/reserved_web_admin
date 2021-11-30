import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

import MenuSideBar from '../../components/MenuSideBar'

interface IFormValues {
  idUser?: string;
  idFoodStore?: string;
  idFoodStoreTable?: string;
  status?: string;
  totalAmount?: string,
}

interface IFormParams {
  id?: string;
}

function CheckoutsForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFormValues>({
    idUser: '',
    idFoodStore: '',
    idFoodStoreTable: '',
    status: '',
    totalAmount: '',
  });

  useEffect(() => {
    if (params.id) {
      api.get(`checkout/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          console.log(response.data)
          if (response.data.idUser) setValues({idUser: response.data.idUser})
          if (response.data.idFoodStore) setValues({idFoodStore: response.data.idFoodStore})
          if (response.data.idFoodStoreTable) setValues({idFoodStoreTable: response.data.idFoodStoreTable})
          if (response.data.status) setValues({status: response.data.status})
          if (response.data.totalAmount) setValues({totalAmount: response.data.totalAmount})
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth])

  const onFormChange = (key: string, value: string) => {
    const updatedForm = {
      ...values,
      [key]: value,
    }

    setValues(updatedForm);
  }

  return (
    <div id="page-user-details">
      <MenuSideBar active={'checkouts'}/>

      <main>
        <div id="form-details">
        <form>
          <h3>Detalhes do usuário</h3>

          <fieldset>
            <div className="inputs">
              <div className="input-block">
                <label htmlFor="idUser">Cliente</label>
                <input
                  type="text"
                  onChange={e => onFormChange('idUser', e.target.value)}
                  value={values.idUser}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="idFoodStore">Estabelecimento</label>
                <input
                  type="text"
                  onChange={e => onFormChange('idFoodStore', e.target.value)}
                  value={values.idFoodStore}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="idFoodStoreTable">Mesa</label>
                <input
                  type="text"
                  onChange={e => onFormChange('idFoodStoreTable', e.target.value)}
                  value={values.idFoodStoreTable}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="status">Situação</label>
                <input
                  type="text"
                  onChange={e => onFormChange('status', e.target.value)}
                  value={values.status}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="totalAmount">Total</label>
                <input
                  type="text"
                  onChange={e => onFormChange('totalAmount', e.target.value)}
                  value={values.totalAmount}
                  disabled={params.id ? true : false}
                />
              </div>
              
            </div>
          </fieldset>

          <div className="buttons">            
            {/* <Link 
              className="clean-filter"
              to={`/${props.origin}`}
              style={{color: 'black'}}>
                <p>
                  Limpar filtros
                </p>
            </Link> */}
            <p></p>
            <p></p>
            <button type="button" onClick={history.goBack}>Voltar</button>
          </div>
        </form>
      </div>
      </main>
    </div>
  )
}

export default CheckoutsForm;