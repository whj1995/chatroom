import './style.css';

interface IProps {
  label: string;
  color?: string;
  size?: 'small' | 'default';
  backgroundColor?: string;
}
function Tag(props: IProps) {
  const { label, color, size, backgroundColor } = props;
  return (
    <div
      className={`tag ${size === 'small' ? 'tagSmall' : ''}`}
      style={{ color, backgroundColor }}>
      {label}
    </div>
  );
}

export default Tag;
