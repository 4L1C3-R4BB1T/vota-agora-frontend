import logoImg from '@assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const SignUpForm = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/");
    
    return (
        <>
            <form>
                <div className={styles['form-header']}>
                    <img src={logoImg} />
                </div>
                <div>
                    <label htmlFor="iEmail">CPF</label>
                    <input type="email" name="email" id="iEmail" placeholder="Digite seu CPF" />
                </div>
                <div>
                    <label htmlFor="iPassword">Senha</label>
                    <input type="password" name="password" id="iPassword" placeholder='Digite a senha' />
                </div>
                 <div>
                    <label htmlFor="iRePassword">Confirmar Senha</label>
                    <input type="password" name="rePassword" id="iRePassword" placeholder='Digite a senha novamente' />
                </div>
                <button type="submit" onClick={handleClick}>Cadastrar</button>
            </form>
            <span>
                Já possui conta? <NavLink className={styles['signup']} to="/auth/signin">Faça login</NavLink>
            </span>
        </>
    );
}

export default SignUpForm;