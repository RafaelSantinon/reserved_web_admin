import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Leaflet, { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';

import './styles.css';
import 'leaflet/dist/leaflet.css';
import mapIconImg from "../../assets/images/marker.png";

import { AuthContext } from '../../routes'

import MenuSideBar from '../../components/MenuSideBar'

interface IFormValues {
  name?: string;
  description?: string;
  cnpj?: string;
  openHours?: string;
  image?: File;
  latitude?: number;
  longitude?: number;
}

interface IFormParams {
  id?: string;
}

const mapIcon = Leaflet.icon({
  iconUrl: mapIconImg,
  iconSize: [40, 40],
})

function FoodStoresForm() {
  const params = useParams<IFormParams>();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState<IFormValues>({
    name:  '',
    description:  '',
    cnpj:  '',
    openHours:  '',
    image: undefined,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (params.id) {
      api.get(`food-store/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${auth}`
        },
      }).then(
        response => {
          if (response.data.name) setValues({name: response.data.name})
          if (response.data.description) setValues({description: response.data.description})
          if (response.data.cnpj) setValues({cnpj: response.data.cnpj})
          if (response.data.openHours) setValues({openHours: response.data.openHours})
          if (response.data.address.latitude) setValues({latitude: response.data.address.latitude})
          if (response.data.address.longitude) setValues({longitude: response.data.address.longitude})
        }
      ).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  },[params.id, history, auth])

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (params.id) {
      api.put(`food-store/${params.id}`, {
        "name": values.name,
        "description": values.description,
        "openHours": values.openHours,
      },
      {  
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push('/food-stores');
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    } else {
      const data = new FormData();

      data.append('name', String(values.name));
      data.append('description', String(values.description));
      data.append('cnpj', String(values.cnpj));
      data.append('openHours', String(values.openHours));
      data.append('image', values.image as File);
      data.append('latitude', String(values.latitude));
      data.append('longitude', String(values.longitude));

      api.post('food-store', data,
      {
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      }
      ).then(response => {
  
        history.push('/food-stores');
      }).catch(err => {
        if (err.status === 401) history.push('/');
      });
    }
  }

  const onFormChange = (key: string, value: string) => {
    const updatedForm = {
      ...values,
      [key]: value,
    }

    setValues(updatedForm);
  }

  function mapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    if(lat && lng) {
      const updatedForm = {
        ...values,
        latitude: lat,
        longitude: lng,
      }
  
      setValues(updatedForm);
    }
  }

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const updatedForm = {
      ...values,
      image: event.target.files[0],
    }

    setValues(updatedForm);
  }

  return (
    <div id="page-user-details">
      <MenuSideBar active={'food-stores'}/>

      <main>
        <div id="form-details">
        <form onSubmit={onSubmitForm}>
          <h3>
            {
              params.id ? 
              'Edição de Restaurante' :
              'Criação de Restaurante'
            }
          </h3>

          <fieldset>
            <div className="inputs">
              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  onChange={e => onFormChange('name', e.target.value)}
                  value={values.name}
                />
              </div>

              <div className="input-block">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  onChange={e => onFormChange('description', e.target.value)}
                  value={values.description}
                />
              </div>

              <div className="input-block">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="text"
                  onChange={e => onFormChange('cnpj', e.target.value)}
                  value={values.cnpj}
                  disabled={params.id ? true : false}
                />
              </div>

              <div className="input-block">
                <label htmlFor="openHours">Horário de funcionamento</label>
                <input
                  type="text"
                  onChange={e => onFormChange('openHours', e.target.value)}
                  value={values.openHours}
                />
              </div>

              <div className="input-block">
                <label htmlFor="openHours">Imagem</label>
                <input
                  type="file"
                  onChange={uploadImage}
                />
              </div>
            </div>

            <div className="map">
              <h3>
              {
                params.id ? 
                'Localização' :
                'Selecione a localização'
              }
              </h3>

              <Map
                center={[-22.907175,-47.0697116]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={mapClick}
              >
                <TileLayer
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />

                { values.latitude !== 0 && (
                  <Marker
                    interactive={ params.id ? true : false}
                    icon={mapIcon}
                    position={[
                      values.latitude ? values.latitude : 0,
                      values.longitude ? values.longitude : 0
                    ]} 
                  />
                )}
              </Map>
            </div>
          </fieldset>

          <div className="buttons">
            <p></p>
            <button type="button" onClick={history.goBack}>Voltar</button>
            
            {/* <Link 
              className="clean-filter"
              to={`/${props.origin}`}
              style={{color: 'black'}}>
                <p>
                  Limpar filtros
                </p>
            </Link> */}

            <button type="submit">{params.id ? 'Editar' : 'Criar'}</button>
          </div>
        </form>
      </div>
      </main>
    </div>
  )
}

export default FoodStoresForm;