import { Node } from 'types';

export const handleTree = ({
  data,
  name,
  paramsId,
  type,
  uniqueId,
}: {
  data: Array<Node>;
  name: string;
  paramsId: string;
  type: string;
  uniqueId: () => string;
}): Array<Node> => {
  if (paramsId === '') {
    return [
      ...data,
      {
        children: [],
        id: uniqueId(),
        name,
        type,
      },
    ];
  }

  return data.map((item) => {
    if (item.id === paramsId) {
      if (type === 'createFolder' || type === 'createFile') {
        return {
          ...item,
          children: [
            ...(item.children || []),
            {
              ...(type === 'createFolder' ? { children: [] } : null),
              id: uniqueId(),
              name,
              type,
            },
          ],
        };
      }
      if (type === 'edit') {
        return {
          children: [...(item.children || [])],
          id: paramsId,
          name,
          type: item.type,
        };
      }
    }

    return {
      ...item,
      children: handleTree({ data: item.children || [], name, paramsId, type, uniqueId }),
    };
  });
};
