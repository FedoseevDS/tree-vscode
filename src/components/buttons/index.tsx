import { useContext } from 'react';

import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

import StateButtonContext from 'context/stateButtonContext';

import styles from './styles.module.scss';

const Buttons = () => {
  const [, setStateButton] = useContext(StateButtonContext);

  const handleClick = (name: string) => () => {
    if (setStateButton) {
      setStateButton(name);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClick('createFolder')}>
        <IconCreateFolder />
      </button>
      <button onClick={handleClick('createFile')}>
        <IconCreateFile />
      </button>
      <button onClick={handleClick('edit')}>
        <IconEdit />
      </button>
      <button onClick={handleClick('delete')}>
        <IconDelete />
      </button>
    </div>
  );
};

export default Buttons;
