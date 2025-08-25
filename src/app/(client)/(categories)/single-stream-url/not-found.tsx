import Image from 'next/image'
import {notFound} from '@/assets/image'

export default function NotFound() {
  return (
    <div className='mt-6 text-center text-gray-500'>
      <Image src={notFound} alt='No results' width={300} height={200} className='mx-auto mb-4' />
    </div>
  )
}