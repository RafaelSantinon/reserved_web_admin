import { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import { AuthContext, MenuContext } from '../../routes'

import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

interface IFormValues {
  idMenu?: string;
  name?: string;
  description?: string;
  price?: string;
}

interface IFormParams {
  id?: string;
}

function MenusItensForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { menu } = useContext(MenuContext);
  const [values, setValues] = useState<IFormValues>({
    idMenu:  '',
    name:  '',
    description:  '',
    price:  ''
  });

  useEffect(() => {
    if (params.id) {
      api.get(`menu-item/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          if (response.data.idMenu) setValues({idMenu: response.data.idMenu})
          if (response.data.name) setValues({name: response.data.name})
          if (response.data.description) setValues({description: response.data.description})
          if (response.data.price) setValues({price: response.data.price})
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth])

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();


    if (params.id) {
      api.put(`menu-item/${params.id}`, {
        "description": values.description,
        "price": values.price,
      },
      {  
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push(`/menus/details/${menu}`);
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    } else {
      api.post('menu-item', {
        "idMenu": menu,
        "name": values.name,
        "description": values.description,
        "price": values.price,
      },
      {
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {

        history.push(`/menus/details/${menu}`);
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
      <MenuSideBar active={'menus'}/>

      <main>
        <div id="form-details">
        <form className="form-menu-itens-details" onSubmit={onSubmitForm}>
          <h3>
            {
              params.id ? 
              'Edição de Item do Cardápio' :
              'Criação de Item do Cardápio'
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
                  disabled={params.id ? true : false}
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
                <label htmlFor="price">Preço</label>
                <input
                  type="text"
                  onChange={e => onFormChange('price', e.target.value)}
                  value={values.price}
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

            <button type="submit">{params.id ? 'Editar' : 'Adicionar'}</button>
          </div>
        </form>
      </div>
      </main>
    </div>
  )
}

export default MenusItensForm;