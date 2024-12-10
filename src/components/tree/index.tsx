import cn from 'classnames';
import { ChangeEvent, Fragment, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Node } from 'types';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import styles from './styles.module.scss';

const RenderTree = ({
  data,
  stateButton,
}: {
  data: [] | Array<Node> | undefined;
  stateButton: string;
}) => {
  const [showChildren, setShowChildren] = useState(new Set(null));
  const [value, setValue] = useState<SetStateAction<string>>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const currentId = useMemo(() => searchParams.get('id'), [searchParams]);
  const isCreateItem = useMemo(
    () => stateButton === 'createFolder' || stateButton === 'createFile',
    [stateButton],
  );
  const isEdit = useMemo(() => stateButton === 'edit', [stateButton]);

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

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value);
  }, []);

  return data?.map((i) => {
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
          {isEdit && currentId === i.id ? <input type="text" /> : <span>{i.name}</span>}
        </button>
        {isCreateItem && currentId === i.id && (
          <input
            autoFocus
            onChange={handleChange}
            type="text"
            value={value}
          />
        )}
        {isChildren && showChildren.has(i.id) && (
          <div className={styles.children}>
            <RenderTree
              data={i.children}
              stateButton={stateButton}
            />
          </div>
        )}
      </Fragment>
    );
  });
};

export default RenderTree;
