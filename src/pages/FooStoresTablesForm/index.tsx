import { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

interface IFormValues {
  idFoodStore?: string;
  number?: string;
  seats?: string;
}

interface IFormParams {
  id?: string;
}

function FooStoresTablesForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFormValues>({
    idFoodStore:  '',
    number:  '',
    seats:  ''
  });

  useEffect(() => {
    if (params.id) {
      api.get(`food-store-table/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          if (response.data.idFoodStore) setValues({idFoodStore: response.data.idFoodStore})
          if (response.data.number) setValues({number: response.data.number})
          if (response.data.seats) setValues({seats: response.data.seats})
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth])

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (params.id) {
      api.put(`food-store-table/${params.id}`, {
        "seats": values.seats,
      },
      {  
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push('/food-stores-tables');
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    } else {
      api.post('food-store-table', {
        "idFoodStore": values.idFoodStore,
        "number": values.number,
        "seats": values.seats
      },
      {
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push('/food-stores-tables');
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
      <MenuSideBar active={'food-stores-tables'}/>

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
                <label htmlFor="idFoodStore">Estabelecimento</label>
                <input
                  type="text"
                  onChange={e => onFormChange('idFoodStore', e.target.value)}
                  value={values.idFoodStore}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="number">Número</label>
                <input
                  type="text"
                  onChange={e => onFormChange('number', e.target.value)}
                  value={values.number}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="seats">Lugares</label>
                <input
                  type="text"
                  onChange={e => onFormChange('seats', e.target.value)}
                  value={values.seats}
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

export default FooStoresTablesForm;