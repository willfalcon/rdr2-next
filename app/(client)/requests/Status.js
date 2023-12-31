import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { changeRequestState } from '@/reducers/requestsSlice';
import { Button } from '@/components/ui/button';

const btnClass = statusCode => {
  switch (statusCode) {
    case 2:
      return 'bg-yellow-400 border-yellow-400 hover:border-yellow-500';
    case 3:
      return 'bg-orange-500 border-orange-500 hover:border-orange-500';
    case 4:
      return 'bg-green-500 border-green-500 hover:border-green-500';
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
      return 'Found';
    case 4:
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
      <div className="flex my-6">
        <button
          className={classNames('rounded-l-full btn p-2', btnClass(status))}
          onClick={() => {
            const newStatus = !status ? 1 : status <= 1 ? 1 : status - 1;
            dispatch(changeRequestState({ item: _id, state: newStatus }));
          }}
        >
          <AiFillCaretLeft />
        </button>
        <div className={classNames('p-2', btnClass(status))}>{statusText(status)}</div>
        <button
          className={classNames('rounded-r-full btn p-2', btnClass(status))}
          onClick={() => {
            const newStatus = !status ? 2 : status >= 4 ? 4 : status + 1;
            dispatch(changeRequestState({ item: _id, state: newStatus }));
          }}
        >
          <AiFillCaretRight />
        </button>
      </div>
    </>
  );
}
