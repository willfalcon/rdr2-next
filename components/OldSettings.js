import { changeSetting } from '@/reducers/settingsSlice';
import { MdOutlineSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useClickAway } from '@uidotdev/usehooks';

export default function Settings() {
  const hideCompleted = useSelector(state => state.settings.hideCompleted);

  const ref = useClickAway(e => {
    ref.current.removeAttribute('open');
  });

  const dispatch = useDispatch();
  return (
    <details className="dropdown dropdown-end" ref={ref}>
      <summary className="btn btn-ghost" id="settings-toggle">
        <MdOutlineSettings className="w-8 h-8" />
      </summary>
      <div className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-100">
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
    </details>
  );
}
