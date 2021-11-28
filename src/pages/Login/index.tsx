import logoImg from '../../assets/images/logo.svg'

import './styles.css';

function Login() {
  return (
    <div id="page-login">
      <div className="content-login">
        <img src={logoImg} alt="Reserved" />

        <div className="login">
          <form>
            <input type="" placeholder="Insira seu email"/>
            <input type="" placeholder="Insira sua senha"/>
            
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;