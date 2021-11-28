import DataTable from '../../components/DataTable'
import FilterTable from '../../components/FilterTable'
import MenuSideBar from '../../components/MenuSideBar'

import './styles.css';

function Administrators() {
  return (
    <div id="page-users">
      <MenuSideBar active={'administrators'}/>

      <main>
        <FilterTable 
          origin={'administrators'}
          name={true}
          email={true}
          type={true}
          idFoodStore={true}
          cnpj={false}
        />
        
        <DataTable/>
      </main>
    </div>
  )
}

export default Administrators;