import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Weapons({ weapons }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Weapon</TableHead>
          <TableHead>Ammo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weapons?.map(({ weapon, ammo, _key }) => {
          return (
            <TableRow key={_key}>
              <TableCell>{weapon}</TableCell>
              <TableCell>{ammo}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
