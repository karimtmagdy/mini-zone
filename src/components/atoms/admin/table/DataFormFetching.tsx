export function DataFormFetching({
  isLoading,
  resource,
}: {
  isLoading: boolean;
  resource: string;
}) {
  return (
    <div className="flex h-40 items-center justify-center">
      {isLoading && `Loading ${resource} data...`}
    </div>
  );
}
