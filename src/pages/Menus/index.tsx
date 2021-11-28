import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

function Menus() {
  return (
    <div id="page-menus">
      <MenuSideBar active={'menus'}/>

      <main>
        <FilterTable 
          origin={'menus'}
          name={false}
          email={false}
          type={true}
          idFoodStore={true}
          cnpj={false}
        />

        <DataTable/>
      </main>
    </div>
  )
}

export default Menus;