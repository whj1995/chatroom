import './style.css';

import { CSSProperties, memo, ReactNode } from 'react';

interface IProps {
  routes: Array<{ path: string; label: ReactNode; highLight?: boolean }>;
  onChange?: (path: string) => void;
  path: string;
  style?: CSSProperties;
}

export const Menu = memo((props: IProps) => {
  const { routes = [], path, onChange, style } = props;
  return (
    <div className='menu' style={style}>
      {routes.map((item, idx) => (
        <div
          key={`${item.path}_${idx}`}
          className={`menuItem ${item.highLight ? 'menuLabelHighLight' : ''}`}>
          <div
            className={`menuLabel ${path === item.path ? 'menuLabelActive' : ''}`}
            onChange={() => onChange?.(item.path)}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
});
