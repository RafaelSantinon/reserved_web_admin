import { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

interface IFormValues {
  name?: string;
  email?: string;
  cellphone?: string;
  bornAt?: string;
  password?: string;
  type?: string;
}

interface IFormParams {
  id?: string;
}

export default function Form() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFormValues>({
    name:  '',
    email:  '',
    cellphone:  '',
    bornAt:  '',
    password:  '',
    type:  '',
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
          if (response.data.type) setValues({type: response.data.type})
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth])

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (params.id) {
      api.put(`user/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
        "name": values.name,
        "email": values.email,
        "cellphone": values.cellphone,
      }).then(response => {
  
        history.push('/administrators');
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    } else {
      api.post('user', {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
        "type": values.type,
        "name": values.name,
        "email": values.email,
        "cellphone": values.cellphone,
        "bornAt": values.bornAt,
        "password": values.password
      }).then(response => {
  
        history.push('/administrators');
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  }

  const onFormChange = (key: string, value: string) => {
    const updatedForm = {
      ...values,
      [key]: value,
    }

    setValues(updatedForm);
  }

  return(
    <div id="form-details">
      <form onSubmit={onSubmitForm}>
        <h3>Criação de administradores</h3>

        <fieldset>
          <div className="inputs">
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                onChange={e => onFormChange('name', e.target.value)}
                value={values.name}
              />
            </div>

            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={e => onFormChange('email', e.target.value)}
                value={values.email}
              />
            </div>

            <div className="input-block">
              <label htmlFor="cellphone">Celular</label>
              <input
                type="text"
                onChange={e => onFormChange('cellphone', e.target.value)}
                value={values.cellphone}
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

            <div className="input-block">
              <label htmlFor="type">Tipo</label>
              <input
                type="text"
                onChange={e => onFormChange('type', e.target.value)}
                value={values.type}
                disabled={params.id ? true : false}
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                type="text"
                onChange={e => onFormChange('password', e.target.value)}
                value={values.password}
                disabled={params.id ? true : false}
              />
            </div>
          </div>
        </fieldset>

        <div className="buttons">
          <p></p>
          <button type="button" onClick={history.goBack}>Voltar</button>
          
          {/* <Link 
            className="clean-filter"
            to={`/${props.origin}`}
            style={{color: 'black'}}>
              <p>
                Limpar filtros
              </p>
          </Link> */}

          <button type="submit">{params.id ? 'Editar' : 'Criar'}</button>
        </div>
      </form>
    </div>
  )
}