import './style.css';

import { memo, ReactNode } from 'react';

interface IProps {
  routes: Array<{ path: string; label: ReactNode }>;
  onChange?: (path: string) => void;
  path: string;
}

export const Breadcrumb = memo((props: IProps) => {
  const { routes = [], path, onChange } = props;
  return (
    <div className='breadcrumb'>
      {routes.map((item, idx) => (
        <div key={`${item.path}_${idx}`} className='breadcrumbItem'>
          <div
            className={`breadcrumbLabel ${
              path === item.path ? 'breadcrumbLabelActive' : ''
            }`}
            onChange={() => onChange?.(item.path)}>
            {item.label}
          </div>
          {idx < routes.length - 1 ? (
            <span className='breadcrumbSplit'>/</span>
          ) : undefined}
        </div>
      ))}
    </div>
  );
});
