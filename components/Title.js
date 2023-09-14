import classNames from 'classnames';

export default function Title({ children, h1 = false, className }) {
  if (h1) {
    return <h1 className={classNames('text-4xl font-bold mb-3 px-4', className)}>{children}</h1>;
  }
  return <h2 className={classNames('text-2xl font-medium mb-3 px-4', className)}>{children}</h2>;
}
