import Spinner from '@/app/(client)/_components/common/spinner';

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}