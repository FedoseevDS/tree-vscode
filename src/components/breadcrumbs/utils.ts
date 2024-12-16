export const filteredData = (data, currentId, prevData = []) => {
  for (const item of data) {
    if (item.id === currentId) {
      prevData.push(item);
      return prevData;
    }
    if (item.children) {
      const result = filteredData(item.children, currentId, [...prevData, item]);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};
