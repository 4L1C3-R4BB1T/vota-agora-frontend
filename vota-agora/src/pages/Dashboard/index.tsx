import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import styles from './styles.module.scss';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;