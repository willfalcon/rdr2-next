import Back from '@/components/Back';
import Title from '@/components/Title';

export default function TrackingLayout({ children }) {
  return (
    <>
      <Back />
      <Title h1>Tracking</Title>
      <Title>Materials</Title>
      {children}
    </>
  );
}
