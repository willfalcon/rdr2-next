import Back from '@/components/Back';
import Title from '@/components/Title';
import { allItems } from '@/lib/fetching';
import MaterialsList from './MaterialsList';
import { alphabetical } from '@/lib/utils';

export default async function Page() {
  const items = await allItems();

  let materialsList = [];
  items.forEach(item => {
    item.materials.forEach(({ material, quantity }) => {
      const index = materialsList.findIndex(m => m.id === material._id);
      if (index < 0) {
        materialsList.push({
          ...material,
          id: material._id,
          vendors: [{ id: item.categories[0].vendor._id, count: quantity, name: item.categories[0].vendor.name }],
        });
      } else {
        const vendorIndex = materialsList[index].vendors.findIndex(vendor => vendor.id === item.categories[0].vendor._id);
        if (vendorIndex < 0) {
          materialsList[index].vendors.push({
            id: item.categories[0].vendor._id,
            count: quantity,
            name: item.categories[0].vendor.name,
          });
        } else {
          materialsList[index].vendors[vendorIndex].count += quantity;
        }
      }
    });
  });

  materialsList.sort(alphabetical);

  return (
    <>
      <Back />
      <Title h1>All Materials</Title>
      <MaterialsList materials={materialsList} />
    </>
  );
}
