import { changeSetting } from '@/reducers/settingsSlice';
import { MdOutlineSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from './ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

export default function Settings() {
  const hideCompleted = useSelector(state => state.settings.hideCompleted);
  const autoSave = useSelector(state => state.settings.autoSave);

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
        <div className="flex items-center space-x-2">
          <Switch
            id="hide-completed"
            checked={hideCompleted}
            onCheckedChange={value => {
              dispatch(changeSetting({ setting: 'hideCompleted', value }));
            }}
          />
          <Label htmlFor="hide-completed">Hide Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-save"
            checked={autoSave}
            onCheckedChange={value => {
              dispatch(changeSetting({ setting: 'autoSave', value }));
            }}
          />
          <Label htmlFor="auto-save">Auto Save</Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
