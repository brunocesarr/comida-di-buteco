export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center m-auto gap-4 animate-pulse">
      <div
        className="m-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <p className="font-extrabold font-display text-2xl animate-bounce">Loading</p>
    </div>
  );
}
