import logo from '@assets/images/logo_white.png';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

const Header = () => {
    return (
        <div className={styles['header']}>
            <NavLink to="/">
                <img src={logo} />
            </NavLink>
            <div>
                <ul>
                    <li>
                        <NavLink className={styles['link']} to="/"
                            style={({ isActive }) => ({ opacity: isActive ? "1" : "0.8" })}>Consultas</NavLink>
                    </li>
                    <li>
                        <NavLink className={styles['link']} to="/profile"
                            style={({ isActive }) => ({ opacity: isActive ? "1" : "0.8" })}>Perfil</NavLink>
                    </li>
                    <li>
                        <NavLink className={styles['link']} to="/auth/signin"
                            style={({ isActive }) => ({ opacity: isActive ? "1" : "0.8" })}>Sair</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;