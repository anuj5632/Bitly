const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 rounded-sm',
    title: 'h-8 w-3/4 rounded-sm',
    avatar: 'h-12 w-12 rounded-sm',
    card: 'h-32 rounded-md',
    button: 'h-10 w-24 rounded-md',
  };

  return (
    <div
      className={`
        skeleton
        bg-surface-secondary/50
        ${variants[variant]}
        ${className}
      `}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-surface-card border border-border-base rounded-md p-6 space-y-5 shadow-md">
    <div className="flex items-center gap-4">
      <Skeleton variant="avatar" className="bg-surface" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2 bg-surface" />
        <Skeleton className="h-3 w-1/3 bg-surface" />
      </div>
    </div>
    <Skeleton className="h-4 w-full bg-surface" />
    <Skeleton className="h-4 w-5/6 bg-surface" />
    <div className="flex gap-4 pt-4 border-t border-border-base">
      <Skeleton variant="button" className="flex-1 bg-surface" />
      <Skeleton variant="button" className="flex-1 bg-surface" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="bg-surface-secondary/30 border border-border-base rounded-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-1/3 bg-surface-card" />
            <Skeleton className="h-3 w-1/2 bg-surface-card" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24 rounded-md bg-surface-card" />
            <Skeleton className="h-10 w-24 rounded-md bg-surface-card" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
