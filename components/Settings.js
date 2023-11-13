import { changeSetting } from '@/reducers/settingsSlice';
import { MdOutlineSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from './ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export default function Settings() {
  const hideCompleted = useSelector(state => state.settings.hideCompleted);

  const dispatch = useDispatch();
  return (
    <Dialog className="">
      <DialogTrigger id="settings-toggle">
        <MdOutlineSettings className="w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
