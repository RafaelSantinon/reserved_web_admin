import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRowsProp
} from '@mui/x-data-grid';
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon';

import './styles.css';

interface IProps {
  type?: boolean;
  name?: boolean;
  email?: boolean;
  cellphone?: boolean;
  bornAt?: boolean;
  description?: boolean;
  cnpj?: boolean;
  number?: boolean;
  seats?: boolean;
  status?: boolean;
  table?: boolean;
  createdAt?: boolean;
  details?: boolean;
  path?: string;
  rows: GridRowsProp;
  button?: boolean;
  price?: boolean;
}

export default function DataTable (props: IProps) {
  function getStatus(status: number){
    let response = null;

    switch(status){
      case 1:
        response = 'Liberado';
        break;

      case 2:
        response = 'Bloqueado';
        break;

      case 3:
        response = 'Reservado';
        break;

      case 4:
        response = 'Pendente';
        break;
    }

    return response;
  }

  function getCheckoutStatus(status: number){
    let response = null;

    switch(status){
      case 1:
        response = 'Pendente';
        break;

      case 2:
        response = 'Aprovado';
        break;

      case 3:
        response = 'Reprovado';
        break;

      case 4:
        response = 'Finalizado';
        break;
    }

    return response;
  }

  function getMenuType(type: number){
    let response = null;

    switch(type){
      case 1:
        response = 'Entradas';
        break;

      case 2:
        response = 'Pranto principal';
        break;

      case 3:
        response = 'Sobremesas';
        break;

      case 4:
        response = 'Bebidas';
        break;
    }

    return response;
  }

  function getAdminType(type: number){
    let response = null;

    switch(type){
      case 1:
        response = 'Plataforma';
        break;

      case 2:
        response = 'Restaurante';
        break;

      case 3:
        response = 'Reserva';
        break;

      case 4:
        response = 'User';
        break;
    }

    return response;
  }

  const getColumns = (props: IProps) => {
    let columns: GridColDef[] = []

    if (props.type) {
      columns.push(
        {
          field: 'type',
          headerName: 'Tipo',
          width: 150,
          editable: false,
          renderCell: (o: GridCellParams) => (
            props.path === 'menus' ? getMenuType(o.row.type) : getAdminType(o.row.type)
          )
        }
      )
    }

    if (props.name) {
      columns.push(
        {
          field: 'name',
          headerName: 'Nome',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.email) {
      columns.push(
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.cellphone) {
      columns.push(
        {
          field: 'cellphone',
          headerName: 'Celular',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.bornAt) {
      columns.push(
        {
          field: 'bornAt',
          headerName: 'Nascimento',
          width: 150,
          editable: false,
          renderCell: (o: GridCellParams) => (
            DateTime.fromISO(o.row.bornAt).toFormat('dd/MM/yyyy')
          )
        }
      )
    }

    if (props.description) {
      columns.push(
        {
          field: 'description',
          headerName: 'Descrição',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.cnpj) {
      columns.push(
        {
          field: 'cnpj',
          headerName: 'CNPJ',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.number) {
      columns.push(
        {
          field: 'number',
          headerName: 'Número',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.seats) {
      columns.push(
        {
          field: 'seats',
          headerName: 'Lugares',
          width: 150,
          editable: false,
        }
      )
    }

    if (props.status) {
      columns.push(
        {
          field: 'status',
          headerName: 'Situação',
          width: 150,
          editable: false,
          renderCell: (o: GridCellParams) => (
            (props.path === 'reserves' || props.path === 'orders') ?
            getCheckoutStatus(o.row.status) :
            getStatus(o.row.status)
          )
        }
      )
    }

    if (props.table) {
      columns.push(
        {
          field: 'tableNumber',
          headerName: 'Mesa',
          width: 150,
          editable: false,
          renderCell: (o: GridCellParams) => (
            `${o.row?.foodStoreTable?.number}`
          )
        }
      )
    }

    if (props.price) {
      columns.push(
        {
          field: 'price',
          headerName: 'Preço',
          width: 150,
          editable: false,
          renderCell: (o: GridCellParams) => (
            `R$ ${o.row.price}`
          )
        }
      )
    }

    if (props.createdAt) {
      columns.push(
        {
          field: 'createdAt',
          headerName: 'Criação',
          width: 150,
          editable: false,
          renderCell: (o: GridCellParams) => (
            DateTime.fromISO(o.row.createdAt).toFormat('dd/MM/yyyy t')
          )
        }
      )
    }

    if (props.details) {
      columns.push(
        {
          field: '',
          headerName: 'Detalhes',
          sortable: false,
          width: 150,
          align: 'center',
          renderCell: (o: GridCellParams) => (
            <div className="details">
              <Link to={`/${props.path}/details/${o.row.id}`}>
                <button type="button">
                  <EyeOutlined/>
                </button>
              </Link>
            </div>
          )
        }
      )
    }

    return columns
  }

  return (
    <div id="data-table">

{console.log(props.rows)}
      <div className="data-table-button">
        {props.button && (
          <Link to={`/${props.path}/create`}>
            <button className="data-table-button-create">Adicionar</button>
          </Link>
        )}
        {!props.button && (
          <button
            className="data-table-button-create"
            style={{ backgroundColor: 'white', border: 'none', cursor: 'default' }}
          >
            teste
          </button>
        )}
      </div>

      <div className="data-table-wrapper" style={{ height: '86%', width: '100%' }}>
        <DataGrid
          rows={props.rows}
          columns={getColumns(props)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnMenu
        />
      </div>
    </div>

  );
}
