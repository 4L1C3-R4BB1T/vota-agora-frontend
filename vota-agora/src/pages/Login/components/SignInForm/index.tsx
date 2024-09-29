import logoImg from '@assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const SignInForm = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/");
    
    return (
        <>
            <form>
                <div className={styles['form-header']}>
                    <img src={logoImg} />
                    <span>Bem-vindo de volta,</span>
                    <span className={styles['small']}>Faça login para continuar</span>    
                </div>
                <div>
                    <label htmlFor="iEmail">CPF</label>
                    <input type="email" name="email" id="iEmail" placeholder="Digite seu CPF" />
                </div>
                <div>
                    <label htmlFor="iPassword">Senha</label>
                    <input type="password" name="password" id="iPassword" placeholder='Digite sua senha atual' />
                </div>
                <button type="submit" onClick={handleClick}>Login</button>
            </form>
            <span>
                Não possui conta? <NavLink className={styles['signin']} to="/auth/signup">Cadastre-se</NavLink>
            </span>
        </>
    );
}

export default SignInForm;