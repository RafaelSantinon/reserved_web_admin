import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRowsProp
} from '@mui/x-data-grid';
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

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
  totalAmount?: boolean;
  createdAt?: boolean;
  details?: boolean;
  path?: string;
  rows: GridRowsProp;
  button?: boolean;
  price?: boolean;
}

export default function DataTable (props: IProps) {
  const getColumns = (props: IProps) => {
    let columns: GridColDef[] = []

    if (props.type) {
      columns.push(
        {
          field: 'type',
          headerName: 'Tipo',
          width: 150,
          editable: false,
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
          headerName: 'Number',
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
        }
      )
    }

    if (props.totalAmount) {
      columns.push(
        {
          field: 'totalAmount',
          headerName: 'Total',
          width: 150,
          editable: false,
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


      <div className="data-table-button">
        {props.button && (
          <Link to={`/${props.path}/create`}>
            <button className="data-table-button-create">Criar</button>
          </Link>
        )}
      </div>

      <div className="data-table-wrapper" style={{ height: '88%', width: '100%' }}>
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
