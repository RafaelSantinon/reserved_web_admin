import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'

import './styles.css';

interface IMenuSidebar{
  active?: string
}

export default function MenuSideBar({ active }: IMenuSidebar) {
  return (
    <aside className="sideBar">
      <img src={logoImg} alt="Reserved" />

      <div className="content-sideBar">
        <div className="item-sideBar">
          <h1>Usuários</h1>

          <Link
            to="/administrators"
            style={
              active === 'administrators'
              ? { textDecoration: 'none', backgroundColor: '#a88787'}
              : { textDecoration: 'none'}
            }>
              <p>
                Administradores
              </p>
          </Link>
          
          <Link 
            to="/clients"
            style={
              active === 'clients'
              ? { textDecoration: 'none', backgroundColor: '#a88787'}
              : { textDecoration: 'none'}
            }>
              <p>
                Clientes
              </p>
          </Link>
        </div>

        <div className="item-sideBar">
          <h1>Estabelecimentos</h1>

          <Link 
            to="/food-stores"
            style={
              active === 'food-stores'
              ? { textDecoration: 'none', backgroundColor: '#a88787'}
              : { textDecoration: 'none'}
            }>
              <p>
                Restaurantes
              </p>
            </Link>

          <Link
            to="/menus"
            style={
              active === 'menus'
              ? { textDecoration: 'none', backgroundColor: '#a88787'}
              : { textDecoration: 'none'}
            }>
              <p>
                Cardápios
              </p>
          </Link>

          <Link
            to="/food-stores-tables"
            style={
              active === 'food-stores-tables'
              ? { textDecoration: 'none', backgroundColor: '#a88787'}
              : { textDecoration: 'none'}
            }>
              <p>
                Mesas
              </p>
          </Link>
        </div>

        <div className="item-sideBar">
          <h1>Relatórios</h1>

          <Link
            to="/checkouts"
            style={
              active === 'checkouts'
              ? { textDecoration: 'none', backgroundColor: '#a88787'}
              : { textDecoration: 'none'}
            }>
              <p>
                Pedidos
              </p>
          </Link>
        </div>
      </div>

      <footer>
        <Link className="logout" to="/" style={{ textDecoration: 'none'}}>
          <button type="button">Sair</button>
        </Link>
      </footer>
    </aside>
  )
}