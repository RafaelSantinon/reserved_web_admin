import {  useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

interface IFormValues {
  name?: string;
  email?: string;
  cellphone?: string;
  bornAt?: string;
}

interface IFormParams {
  id?: string;
}

function ClientsForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFormValues>({
    name:  '',
    email:  '',
    cellphone:  '',
    bornAt:  '',
  });

  useEffect(() => {
    if (params.id) {
      api.get(`user/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          if (response.data.name) setValues({name: response.data.name})
          if (response.data.email) setValues({email: response.data.email})
          if (response.data.cellphone) setValues({cellphone: response.data.cellphone})
          if (response.data.bornAt) setValues({bornAt: response.data.bornAt})
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
      <MenuSideBar active={'administrators'}/>

      <main>
        <div id="form-details">
        <form>
          <h3>Detalhes do usuário</h3>

          <fieldset>
            <div className="inputs">
              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  onChange={e => onFormChange('name', e.target.value)}
                  value={values.name}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  onChange={e => onFormChange('email', e.target.value)}
                  value={values.email}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="cellphone">Celular</label>
                <input
                  type="text"
                  onChange={e => onFormChange('cellphone', e.target.value)}
                  value={values.cellphone}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="bornAt">Nascimento</label>
                <input
                  type="text"
                  onChange={e => onFormChange('bornAt', e.target.value)}
                  value={values.bornAt}
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

export default ClientsForm;