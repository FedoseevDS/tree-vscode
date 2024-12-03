import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

import styles from './styles.module.scss';

const Buttons = () => {
  return (
    <div className={styles.wrapper}>
      <button>
        <IconCreateFolder />
      </button>
      <button>
        <IconCreateFile />
      </button>
      <button>
        <IconEdit />
      </button>
      <button>
        <IconDelete />
      </button>
    </div>
  );
};

export default Buttons;
