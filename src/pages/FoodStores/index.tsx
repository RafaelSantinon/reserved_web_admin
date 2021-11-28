import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

function FoodStores() {
  return (
    <div id="page-food-stores">
      <MenuSideBar active={'food-stores'}/>

      <main>
        <FilterTable
          origin={'food-stores'}
          name={true}
          email={false}
          type={false}
          idFoodStore={true}
          cnpj={true}
        />

        <DataTable/>        
      </main>
    </div>
  )
}

export default FoodStores;