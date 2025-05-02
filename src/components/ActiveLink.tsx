import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ActiveLinkProps = {
  path: string;
  title: string;
};

export function ActiveLink({ path, title }: ActiveLinkProps) {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`hover:bg-gray-100/5 p-2 rounded-t-lg ${pathName === path ? 'border-0 border-b-2 border-gray-100/15 rounded-b-sm hover:rounded-b-lg' : 'rounded-b-lg'}`}>
      {title}
    </Link>
  );
}
