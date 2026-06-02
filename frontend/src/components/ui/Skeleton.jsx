import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'text', // text, circle, rect
  ...props
}) => {
  const baseStyles = 'animate-pulse bg-slate-200/70 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    rect: 'h-32 w-full rounded-2xl',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 w-full">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium space-y-4">
            <Skeleton variant="circle" className="h-8 w-8" />
            <Skeleton variant="text" className="w-1/2 h-3" />
            <Skeleton variant="text" className="w-3/4 h-6" />
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-premium space-y-4">
            <Skeleton variant="text" className="w-1/3 h-5" />
            <Skeleton variant="rect" className="h-64" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-premium space-y-4">
            <Skeleton variant="text" className="w-1/2 h-5" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton variant="circle" className="h-10 w-10" />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" className="w-3/4 h-3.5" />
                    <Skeleton variant="text" className="w-1/2 h-2.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
