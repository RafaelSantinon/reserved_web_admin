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
      </main>
    </div>
  )
}

export default FoodStoresTables;