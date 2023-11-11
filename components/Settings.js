import { changeSetting } from '@/reducers/settingsSlice';
import { MdOutlineSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from './ui/navigation-menu';

export default function Settings() {
  const hideCompleted = useSelector(state => state.settings.hideCompleted);

  const dispatch = useDispatch();
  return (
    <NavigationMenuItem className="">
      <NavigationMenuTrigger id="settings-toggle">
        <MdOutlineSettings className="w-8 h-8" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="">
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
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
