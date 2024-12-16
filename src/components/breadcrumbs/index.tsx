import { Link, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { filteredData } from './utils';

const Breadcrumbs = () => {
  const [data] = useLocalStorage('data', []);

  const [searchParams] = useSearchParams();

  const showBreadcrumbs = filteredData(data, searchParams.get('id'));

  return (
    <div>
      <Link to="/">
        <span>Корень /</span>
      </Link>
      {showBreadcrumbs?.map((i: { id: string; name: string }) => (
        <Link
          key={i.name + i.id}
          to={`?id=${i.id}`}
        >
          <span>{` ${i.name} /`}</span>
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
