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
        {weapons.map(({ weapon, ammo }) => {
          return (
            <tr>
              <td>{weapon}</td>
              <td>{ammo}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
