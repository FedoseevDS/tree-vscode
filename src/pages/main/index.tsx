import { useState } from 'react';

import Header from 'components/header';
import SideBar from 'components/sideBar';

import StateButtonContext, { initialState } from 'context/stateButtonContext';

import styles from './styles.module.scss';

const Main = () => {
  const stateButton = useState(initialState);

  return (
    <StateButtonContext.Provider value={stateButton}>
      <div className={styles.container}>
        <Header />
        <div className={styles.body}>
          <SideBar />
          <div />
        </div>
      </div>
    </StateButtonContext.Provider>
  );
};

export default Main;
