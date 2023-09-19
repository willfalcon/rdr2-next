import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { changeRequestState } from '@/reducers/requestsSlice';

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

const statusText = statusCode => {
  switch (statusCode) {
    case 2:
      return 'Looking';
    case 3:
      return 'Given';
    case 1:
    default:
      return 'Not Started';
  }
};

export default function Status({ _id }) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.requests.find(i => i.id === _id)?.state);

  return (
    <>
      <div className="join my-6">
        <button
          className={classNames('join-item rounded-l-full btn', btnClass(status))}
          onClick={() => {
            const newStatus = !status ? 1 : status <= 1 ? 1 : status - 1;
            dispatch(changeRequestState({ item: _id, state: newStatus }));
          }}
        >
          <AiFillCaretLeft />
        </button>
        <div className={classNames('join-item btn', btnClass(status))}>{statusText(status)}</div>
        <button
          className={classNames('join-item rounded-r-full btn', btnClass(status))}
          onClick={() => {
            const newStatus = !status ? 2 : status >= 3 ? 3 : status + 1;
            dispatch(changeRequestState({ item: _id, state: newStatus }));
          }}
        >
          <AiFillCaretRight />
        </button>
      </div>
    </>
  );
}
