import voteImg from '@assets/images/vote.png';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const Login = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['aside']}>
                <img src={voteImg} alt="" />
                <p>
                    O futuro não se constrói sozinho.
                    Sua voz é a chave para a mudança.
                    Vote e faça parte da transformação!
                </p>
            </div>
            <div className={styles['main']}>
                <Outlet />
            </div>
        </div>
    );
}

export default Login;