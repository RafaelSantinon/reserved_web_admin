import { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

interface IFormValues {
  name?: string;
  description?: string;
  cnpj?: string;
}

interface IFormParams {
  id?: string;
}

function FoodStoresForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFormValues>({
    name:  '',
    description:  '',
    cnpj:  '',
  });

  useEffect(() => {
    if (params.id) {
      api.get(`food-store/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          if (response.data.name) setValues({name: response.data.name})
          if (response.data.description) setValues({description: response.data.description})
          if (response.data.cnpj) setValues({cnpj: response.data.cnpj})
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth])

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (params.id) {
      api.put(`food-store/${params.id}`, {
        "name": values.name,
        "description": values.description,
      },
      {  
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push('/food-stores');
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    } else {
      api.post('food-store', {
        "name": values.name,
        "description": values.description,
        "cnpj": values.cnpj,
      },
      {
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push('/food-stores');
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

  return (
    <div id="page-user-details">
      <MenuSideBar active={'food-stores'}/>

      <main>
        <div id="form-details">
        <form onSubmit={onSubmitForm}>
          <h3>
            {
              params.id ? 
              'Edição de Restaurante' :
              'Criação de Restaurante'
            }
          </h3>

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
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  onChange={e => onFormChange('description', e.target.value)}
                  value={values.description}
                />
              </div>

              <div className="input-block">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="text"
                  onChange={e => onFormChange('cnpj', e.target.value)}
                  value={values.cnpj}
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
      </main>
    </div>
  )
}

export default FoodStoresForm;