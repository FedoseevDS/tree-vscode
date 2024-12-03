import Breadcrumbs from 'components/breadcrumbs';
import Buttons from 'components/buttons';

import styles from './styles.module.scss';

const Header = () => (
  <div className={styles.wrapper}>
    <Breadcrumbs />
    <Buttons />
  </div>
);

export default Header;
