import { cn } from '@/lib/utils';

export default function Conatiner({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('container', className)}>{children}</div>;
}
