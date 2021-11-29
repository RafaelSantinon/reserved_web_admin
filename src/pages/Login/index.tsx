import { FormEvent, useState, useContext } from 'react';
import { useHistory } from 'react-router';

import logoImg from '../../assets/images/logo.svg'

import api from '../../services/api';

import './styles.css';

import { AuthContext } from '../../routes'

function Login() {
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmitLogin(event: FormEvent) {
    event.preventDefault();

    api.post('login', {
      email,
      password
    }).then(response => {
      setAuth(response.data);

      console.log('auth :', auth);
      history.push('/food-stores');
    }).catch(err => {
    });
  }

  return (
    <div id="page-login">
      <div className="content-login">
        <img src={logoImg} alt="Reserved" />

        <div className="login">
          <form onSubmit={onSubmitLogin}>
            <input
              type="text"
              placeholder="Insira seu email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="text"
              placeholder="Insira sua senha"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;