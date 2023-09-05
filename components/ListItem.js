import dynamic from 'next/dynamic';

const ItemDetails = dynamic(() => import('./ItemDetails'), { ssr: false });

export default function ListItem(item) {
  return (
    <div className="collapse collapse-arrow border-b grid grid-cols-[1fr_auto] overflow-visible">
      <input type="checkbox" />
      <h2 className="collapse-title text-lg font-medium">
        <div className="w-[95%]">
          <span className="">{item.name}</span>
        </div>
      </h2>
      <div className="collapse-content">
        <ItemDetails item={item} />
      </div>
    </div>
  );
}
