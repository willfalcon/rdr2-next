import { changeStatus } from '@/reducers/listsSlice';
import classNames from 'classnames';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const statusText = statusCode => {
  switch (statusCode) {
    case 2:
      return 'Tracking';
    case 3:
      return 'Complete';
    case 1:
    default:
      return 'Untracked';
  }
};

const btnClass = statusCode => {
  switch (statusCode) {
    case 2:
      return 'btn-warning';
    case 3:
      return 'btn-success';
    case 1:
    default:
      '';
  }
};
export default function ItemStatus({ status, id }) {
  const statusCode = status?.status;

  const dispatch = useDispatch();
  return (
    <div className="join">
      <button
        className={classNames('join-item rounded-l-full btn', btnClass(statusCode))}
        onClick={() => {
          const newStatus = !statusCode ? 1 : statusCode <= 1 ? 1 : statusCode - 1;
          dispatch(changeStatus({ item: id, status: newStatus }));
        }}
      >
        <AiFillCaretLeft />
      </button>
      <div className={classNames('join-item btn', btnClass(statusCode))}>{statusText(statusCode)}</div>
      <button
        className={classNames('join-item rounded-r-full btn', btnClass(statusCode))}
        onClick={() => {
          const newStatus = !statusCode ? 2 : statusCode >= 3 ? 3 : statusCode + 1;
          dispatch(changeStatus({ item: id, status: newStatus }));
        }}
      >
        <AiFillCaretRight />
      </button>
    </div>
  );
}
