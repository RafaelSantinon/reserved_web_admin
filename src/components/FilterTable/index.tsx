import { useState, FormEvent, useContext } from 'react';
import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom'

import api from '../../services/api';

import './styles.css';

import { AuthContext, RowsFilterContext } from '../../routes'

interface IFilterTable {
  origin?: string;
  name?: boolean;
  email?: boolean;
  type?: boolean;
  idFoodStore?: boolean;
  cnpj?: boolean;
  baseUrl?: string;
}

interface IFilterTableValues {
  origin?: string;
  name?: string;
  email?: string;
  type?: string;
  idFoodStore?: string;
  cnpj?: string;
}

export default function FilterTable(props: IFilterTable) {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFilterTableValues>({
    origin:  '',
    name:  '',
    email:  '',
    type:  '',
    idFoodStore:  '',
    cnpj:  '',
  });
  const { setRowsFilter } = useContext(RowsFilterContext);

  async function onSubmitFilters(event: FormEvent) {
    event.preventDefault();

    let url: string = `${props.baseUrl}`

    if (values.name) url += `&name=${values.name}`
    if (values.email) url += `&email=${values.email}`
    if (values.type) url += `&type=${values.type}`
    if (values.idFoodStore) url += `&idFoodStore=${values.idFoodStore}`
    if (values.cnpj) url += `&cnpj=${values.cnpj}`

    api.get(url, {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    }).then(response => {
      setRowsFilter(response.data.rows);

      history.push(`${props.origin}`);
    }).catch(err => {
      if (err.status === 401) history.push('/');

      setRowsFilter([]);
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
    <div id="filter-table">
      <form className="filter-form" onSubmit={onSubmitFilters}>
        <h3>Informe os campos para busca</h3>

        <fieldset>
          {props.name && (
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                onChange={e => onFormChange('name', e.target.value)}
                value={values.name}
              />
            </div>
          )}

          {props.email && (
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={e => onFormChange('email', e.target.value)}
                value={values.email}
              />
            </div>
          )}

          {props.type && (
            <div className="input-block">
              <label htmlFor="type">Tipo</label>
              <input
                type="type"
                onChange={e => onFormChange('type', e.target.value)}
                value={values.type}
              />
            </div>
          )}

          {props.idFoodStore && (
            <div className="input-block">
              <label htmlFor="idFoodStore">Estabelecimento</label>
              <input
                type="idFoodStore"
                onChange={e => onFormChange('idFoodStore', e.target.value)}
                value={values.idFoodStore}
              />
            </div>
          )}

          {props.cnpj && (
            <div className="input-block">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                type="cnpj"
                onChange={e => onFormChange('cnpj', e.target.value)}
                value={values.cnpj}
              />
            </div>
          )}
        </fieldset>
        
        <div className="filter-buttons">
          <p></p>
          <p></p>
          
          {/* <Link 
            className="clean-filter"
            to={`/${props.origin}`}
            style={{color: 'black'}}>
              <p>
                Limpar filtros
              </p>
          </Link> */}

          <button type="submit">Filtrar</button>
        </div>
      </form>
    </div>
  )
}