import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

function Checkouts() {
  return (
    <div id="page-checkouts">
      <MenuSideBar active={'checkouts'}/>

      <main>
        <FilterTable 
          origin={'checkouts'}
          name={true}
          email={true}
          type={true}
          idFoodStore={true}
          cnpj={true}
        />
      </main>
    </div>
  )
}

export default Checkouts;