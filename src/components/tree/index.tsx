import cn from 'classnames';
import { Fragment, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import styles from './styles.module.scss';

const RenderTree = ({ data }) => {
  const [showChildren, setShowChildren] = useState(new Set(null));

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(
    (id: string) => () => {
      const newSet = new Set(showChildren);
      if (showChildren.has(id)) {
        newSet.delete(id);
        setShowChildren(newSet);
      } else {
        newSet.add(id);
        setShowChildren(newSet);
        setSearchParams((e) => {
          const newParams = new URLSearchParams(e);
          newParams.set('id', id);
          return newParams;
        });
      }
    },
    [showChildren, setSearchParams],
  );

  return data.map((i) => {
    const isChildren = !!i.children;

    return (
      <Fragment key={i.id}>
        <button
          className={cn(styles.item, { [styles.itemActive]: searchParams.get('id') === i.id })}
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
