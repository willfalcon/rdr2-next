export default function Weapons({ weapons }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Weapon</th>
          <th>Ammo</th>
        </tr>
      </thead>
      <tbody>
        {weapons.map(({ weapon, ammo, _key }) => {
          return (
            <tr key={_key}>
              <td>{weapon}</td>
              <td>{ammo}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
