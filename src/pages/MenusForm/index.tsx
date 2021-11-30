import { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import { AuthContext, RowsFilterContext, MenuContext } from '../../routes'

import DataTable from '../../components/DataTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

interface IFormValues {
  idFoodStore?: string;
  type?: string;
}

interface IFormParams {
  id?: string;
}

function MenusForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { rowsFilter, setRowsFilter } = useContext(RowsFilterContext);
  const { setMenu } = useContext(MenuContext);
  const [values, setValues] = useState<IFormValues>({
    idFoodStore:  '',
    type:  ''
  });

  useEffect(() => {
    if (params.id) {
      api.get(`menu/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          if (response.data.idFoodStore) setValues({idFoodStore: response.data.idFoodStore})
          if (response.data.type) setValues({type: response.data.type})

          setMenu(response.data.id)
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });

      api.get(`menu-item?idMenu=${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          setRowsFilter(response.data.rows)
        }
      ).catch(err => {
        setRowsFilter([])
        
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth, setRowsFilter, setMenu])

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    api.post('menu', {
      "idFoodStore": values.idFoodStore,
      "type": values.type
    },
    {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    }
    ).then(response => {

      history.push('/menus');
    }).catch(err => {
      if (err.status === 401) history.push('/');
    });
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
      <MenuSideBar active={'menus'}/>

      <main>
        <div id="form-details">
        <form className="form-menu-itens" onSubmit={onSubmitForm}>
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
                <label htmlFor="type">Tipo</label>
                <input
                  type="text"
                  onChange={e => onFormChange('type', e.target.value)}
                  value={values.type}
                  disabled={params.id ? true : false}
                />
              </div>

            </div>
          </fieldset>

          <div className="data-table">
            <h3>Itens no Cardápio</h3>
            <DataTable
              name={true}
              description={true}
              price={true}
              createdAt={true}
              details={true}
              path={'menu-itens'}
              rows={rowsFilter as any}
              button={true}
            />
          </div>

          <div className="buttons">
            <p></p>

            {params.id && (
              <p></p>
            )}

            <button type="button" onClick={history.goBack}>Voltar</button>
            
            {/* <Link 
              className="clean-filter"
              to={`/${props.origin}`}
              style={{color: 'black'}}>
                <p>
                  Limpar filtros
                </p>
            </Link> */}

            {!params.id && (
              <button type="submit">{params.id ? 'Editar' : 'Criar'}</button>
            )}
          </div>
        </form>
      </div>
      </main>
    </div>
  )
}

export default MenusForm;