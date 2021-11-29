import { Link } from 'react-router-dom'

import './styles.css';

interface IFilterTable {
  origin?: string;
  name?: boolean;
  email?: boolean;
  type?: boolean;
  idFoodStore?: boolean;
  cnpj?: boolean;
}

export default function FilterTable(props: IFilterTable) {
  return (
    <div id="filter-table">
      <form className="filter-form">
        <h3>Informe os campos para busca</h3>

        <fieldset>
          {props.name && (
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input type="name" />
            </div>
          )}

          {props.email && (
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input type="email" />
            </div>
          )}

          {props.type && (
            <div className="input-block">
              <label htmlFor="type">Tipo</label>
              <input type="type" />
            </div>
          )}

          {props.idFoodStore && (
            <div className="input-block">
              <label htmlFor="idFoodStore">Estabelecimento</label>
              <input type="idFoodStore" />
            </div>
          )}

          {props.cnpj && (
            <div className="input-block">
              <label htmlFor="cnpj">CNPJ</label>
              <input type="cnpj" />
            </div>
          )}
        </fieldset>
        
        <div className="filter-buttons">
          <p></p>
          
          <Link 
            className="clean-filter"
            to={`/${props.origin}`}
            style={{color: 'black'}}>
              <p>
                Limpar filtros
              </p>
          </Link>

          <button type="submit">Filtrar</button>
        </div>
      </form>
    </div>
  )
}