import cn from 'classnames';
import { Fragment, useCallback, useState } from 'react';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import styles from './styles.module.scss';

const RenderTree = ({ data }) => {
  const [showChildren, setShowChildren] = useState(new Set(null));

  const handleClick = useCallback(
    (id: string) => () => {
      const newSet = new Set(showChildren);
      if (showChildren.has(id)) {
        newSet.delete(id);
        setShowChildren(newSet);
      } else {
        newSet.add(id);
        setShowChildren(newSet);
      }
    },
    [showChildren],
  );

  return data.map((i) => {
    const isChildren = !!i.children;

    return (
      <Fragment key={i.id}>
        <button
          className={styles.item}
          onClick={handleClick(i.id)}
        >
          <IconChevron
            className={cn(styles.chevron, { [styles.chevronActive]: showChildren.has(i.id) })}
          />
          <IconFolder />
          <span>{i.name}</span>
        </button>
        {isChildren && showChildren.has(i.id) && (
          <div className={styles.children}>
            <RenderTree data={i.children} />
          </div>
        )}
      </Fragment>
    );
  });
};

export default RenderTree;
