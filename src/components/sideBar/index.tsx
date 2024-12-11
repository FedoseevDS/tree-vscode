import { useContext } from 'react';

import RenderTree from 'components/tree';

import StateButtonContext from 'context/stateButtonContext';

// import { data } from './const';

import { useLocalStorage } from 'hooks/useLocalStorage';

import styles from './styles.module.scss';

const SideBar = () => {
  const [stateButton, setStateButton] = useContext(StateButtonContext);

  const [data, setData] = useLocalStorage('data', []);

  // console.log('data', data);

  return (
    <div className={styles.container}>
      <RenderTree
        data={data}
        onData={setData}
        onStateButton={setStateButton}
        stateButton={stateButton}
      />
    </div>
  );
};

export default SideBar;
