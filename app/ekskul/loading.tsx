export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 rounded bg-gray-200" />
      <div className="h-4 w-64 rounded bg-gray-200" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-48 rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
