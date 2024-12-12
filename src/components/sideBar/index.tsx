import { useContext, useEffect, useMemo } from 'react';

import RenderTree from 'components/tree';

import StateButtonContext from 'context/stateButtonContext';

// import { data } from './const';

import { useSearchParams } from 'react-router-dom';
import { Node } from 'types';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { handleDeleteItem } from './utils';

import styles from './styles.module.scss';

const SideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateButton, setStateButton] = useContext(StateButtonContext);

  const currentId = useMemo(() => searchParams.get('id'), [searchParams]);

  const [data, setData] = useLocalStorage('data', []);

  useEffect(() => {
    if (stateButton === 'delete' && currentId) {
      setData((prev: Array<Node> | undefined) => {
        return prev && handleDeleteItem(prev, currentId);
      });
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('id', currentId);
        return newParams;
      });
      if (setStateButton) {
        setStateButton('');
      }
    }
  }, [stateButton, currentId, setData, setStateButton, setSearchParams]);

  return (
    <div className={styles.container}>
      <RenderTree
        currentId={currentId}
        data={data}
        onData={setData}
        onStateButton={setStateButton}
        stateButton={stateButton}
      />
    </div>
  );
};

export default SideBar;
