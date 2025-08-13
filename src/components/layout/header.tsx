import Link from 'next/link';
import { Edu_NSW_ACT_Cursive } from 'next/font/google';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const eduFont = Edu_NSW_ACT_Cursive({
  subsets: ['latin'],
});

export default function Header() {
  const router = useRouter();

  return (
    <header className="m-4 mx-auto w-full max-w-6xl rounded-full bg-white p-3 text-black">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className={`${eduFont.className} text-xl font-bold`}>
              Draftly
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/profile">
            <span className="hover:text-neutral-600">Profile</span>
          </Link>
          <Link href="/post/create">
            <span className="hover:text-neutral-600">Create Post</span>
          </Link>
          <Button
            onClick={() => router.push('/')}
            variant={'secondary'}
            className="cursor-pointer"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
