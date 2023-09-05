export default function Title({ children, h1 = false }) {
  if (h1) {
    return <h1 className="text-4xl font-bold mb-3 px-4">{children}</h1>;
  }
  return <h2 className="text-2xl font-medium mb-3 px-4">{children}</h2>;
}
