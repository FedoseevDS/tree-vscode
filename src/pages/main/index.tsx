import Header from 'components/header';
import SideBar from 'components/sideBar';

import styles from './styles.module.scss';

const Main = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.body}>
      <SideBar />
      <div />
    </div>
  </div>
);

export default Main;
