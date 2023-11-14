import { useSelector } from 'react-redux';
import Weapons from './Weapons';
import Manage from './Manage';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TabsContent } from '@/components/ui/tabs';
export default function Material(props) {
  const { id, name, type, vendors, mode, weapons } = props;

  const totalNeeded = vendors.reduce((acc, cur) => acc + cur.count, 0);
  const totalGiven = useSelector(state => {
    const given = state.given.find(g => g.id === id);
    return given?.vendors.reduce((acc, cur) => acc + cur.count, 0) || 0;
  });
  const holding = useSelector(state => state.holding.find(h => h.id === id)?.count || 0);
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="px-4">{`${name} ${type} ${holding + totalGiven} / ${totalNeeded}`}</AccordionTrigger>

      <AccordionContent>
        <div className="px-4">
          {/* {mode === 'manage' ? <Manage id={id} vendors={vendors} /> : <Weapons weapons={weapons} />} */}
          <TabsContent value="manage">
            <Manage id={id} vendors={vendors} />
          </TabsContent>
          <TabsContent value="weapons">
            <Weapons weapons={weapons} />
          </TabsContent>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
