export default function PageLoading() {
  return (
    <div role="status" className="min-h-[50vh] flex flex-col items-center justify-center gap-4 bg-light text-primary">
      <span className="h-8 w-8 rounded-full border-2 border-border border-t-primary animate-spin" />
      <span className="text-sm font-medium">Loading Gomzi Nutrition…</span>
    </div>
  );
}
