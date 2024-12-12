import { Node } from 'types';

export const handleDeleteItem: (data: Node[] | undefined, currentId: string) => Node[] = (
  data,
  currentId,
) => {
  const safeData = data || [];

  return safeData.reduce((prevV: Node[], curV: Node) => {
    const isItem = curV.id === currentId;
    if (isItem) {
      return [...prevV];
    }
    if (curV.type === 'createFolder') {
      return [
        ...prevV,
        {
          ...curV,
          children: handleDeleteItem(curV.children, currentId),
        },
      ];
    }
    return [...prevV, curV];
  }, []);
};
