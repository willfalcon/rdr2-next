import { useSelector } from 'react-redux';
import Weapons from './Weapons';
import Manage from './Manage';
export default function Material(props) {
  const { id, name, type, vendors, mode, weapons } = props;

  const totalNeeded = vendors.reduce((acc, cur) => acc + cur.count, 0);
  const totalGiven = useSelector(state => {
    const given = state.given.find(g => g.id === id);
    return given?.vendors.reduce((acc, cur) => acc + cur.count, 0) || 0;
  });
  const holding = useSelector(state => state.holding.find(h => h.id === id)?.count || 0);
  return (
    <li className="collapse collapse-arrow border-b grid grid-cols-[1fr_auto] overflow-visible">
      <input type="checkbox" />
      <h2 className="collapse-title text-lg font-medium">
        <div className="w-[95%]">
          <span className="">
            {name} {type}
          </span>
          <span className="ml-2">
            {holding + totalGiven} / {totalNeeded}
          </span>
        </div>
      </h2>
      <div className="collapse-content">
        <div className="">{mode === 'manage' ? <Manage id={id} vendors={vendors} /> : <Weapons weapons={weapons} />}</div>
      </div>
    </li>
  );
}
