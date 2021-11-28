import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

function FoodStoresTables() {

  return (
    <div id="page-food-stores-tables">
      <MenuSideBar active={'food-stores-tables'}/>

      <main>
        <FilterTable 
          origin={'food-stores-tables'}
          name={false}
          email={false}
          type={false}
          idFoodStore={true}
          cnpj={false}
        />

        <DataTable/>
      </main>
    </div>
  )
}

export default FoodStoresTables;