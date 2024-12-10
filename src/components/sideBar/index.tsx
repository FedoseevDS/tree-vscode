import { useContext } from 'react';

import RenderTree from 'components/tree';

import StateButtonContext from 'context/stateButtonContext';

import { data } from './const';

import styles from './styles.module.scss';

const SideBar = () => {
  const [stateButton, setStateButton] = useContext(StateButtonContext);

  return (
    <div className={styles.container}>
      <RenderTree
        data={data}
        stateButton={stateButton}
      />
    </div>
  );
};

export default SideBar;
