import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

function Clients() {
  return (
    <div id="page-users">
      <MenuSideBar active={'clients'}/>

      <main>
        <FilterTable 
          origin={'clients'}
          name={true}
          email={true}
          type={true}
          idFoodStore={false}
          cnpj={false}
        />

        <DataTable/>
      </main>
    </div>
  )
}

export default Clients;