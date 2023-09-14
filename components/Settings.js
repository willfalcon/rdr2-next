import { changeSetting } from '@/reducers/settingsSlice';
import { MdOutlineSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

export default function Settings() {
  const hideCompleted = useSelector(state => state.settings.hideCompleted);

  const dispatch = useDispatch();
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost">
        <MdOutlineSettings className="w-8 h-8" />
      </label>
      <div tabIndex={0} className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-100">
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Hide Completed</span>
            <input
              type="checkbox"
              className="toggle"
              checked={hideCompleted}
              onChange={() => {
                dispatch(changeSetting({ setting: 'hideCompleted', value: !hideCompleted }));
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
