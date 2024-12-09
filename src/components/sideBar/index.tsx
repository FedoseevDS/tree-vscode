import RenderTree from 'components/tree';

import { data } from './const';

import styles from './styles.module.scss';

const SideBar = () => {
  return (
    <div className={styles.container}>
      <RenderTree data={data} />
    </div>
  );
};

export default SideBar;
