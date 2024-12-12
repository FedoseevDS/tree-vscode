import cn from 'classnames';
import { nanoid } from 'nanoid';
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  KeyboardEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Node } from 'types';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import { handleTree } from './utils';

import styles from './styles.module.scss';

const RenderTree = ({
  currentId,
  data,
  onData: setData,
  onStateButton,
  stateButton,
}: {
  currentId: null | string;
  data: [] | Array<Node> | undefined;
  onData?: void;
  onStateButton: Dispatch<SetStateAction<string>> | null;
  stateButton: string;
}) => {
  const [showChildren, setShowChildren] = useState(new Set(null));
  const [value, setValue] = useState<number | readonly string[] | string | undefined>('');
  const [isCreateItem, setIsCreateItem] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

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

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        setData((prev: Array<Node>) => {
          const result = handleTree({
            data: prev ? [...prev] : [],
            name: value,
            paramsId: searchParams.get('id') || '',
            type: stateButton,
            uniqueId: nanoid,
          });

          return result as Array<Node> | undefined;
        });
        if (onStateButton) {
          onStateButton('');
        }
        setValue('');
      }
      if (e.code === 'Escape') {
        if (onStateButton) {
          onStateButton('');
        }
        setValue('');
      }
    },
    [onStateButton, setData, value, searchParams, stateButton],
  );

  useEffect(() => {
    setIsCreateItem(stateButton === 'createFolder' || stateButton === 'createFile');
  }, [stateButton]);

  if (data?.length) {
    return data?.map((i, _, arr) => {
      const isChildren = !!i.children;

      return (
        <Fragment key={i.id}>
          <button
            className={cn(styles.item, { [styles.itemActive]: searchParams.get('id') === i.id })}
            onClick={handleClick(i.id)}
          >
            {i.type === 'createFolder' && (
              <>
                <IconChevron
                  className={cn(styles.chevron, {
                    [styles.chevronActive]: showChildren.has(i.id),
                  })}
                />
                <IconFolder />
              </>
            )}
            {isEdit && currentId === i.id ? (
              <input
                autoFocus
                onChange={handleChange}
                onKeyDown={onInputKeyDown}
                type="text"
                value={value}
              />
            ) : (
              <span>{i.name}</span>
            )}
          </button>
          {isCreateItem && currentId === i.id && (
            <input
              autoFocus
              onChange={handleChange}
              onKeyDown={onInputKeyDown}
              type="text"
              value={value}
            />
          )}
          {isCreateItem && arr.slice(-1).find(({ id }) => id === i.id) && !currentId && (
            <input
              autoFocus
              onChange={handleChange}
              onKeyDown={onInputKeyDown}
              type="text"
              value={value}
            />
          )}
          {isChildren && showChildren.has(i.id) && (
            <div className={styles.children}>
              <RenderTree
                currentId={currentId}
                data={i.children}
                onData={setData}
                onStateButton={onStateButton}
                stateButton={stateButton}
              />
            </div>
          )}
        </Fragment>
      );
    });
  } else {
    return (
      isCreateItem &&
      !currentId && (
        <input
          autoFocus
          onChange={handleChange}
          onKeyDown={onInputKeyDown}
          type="text"
          value={value}
        />
      )
    );
  }
};

export default RenderTree;
