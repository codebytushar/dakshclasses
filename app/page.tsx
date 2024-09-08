import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import DakshClassesLogo from './ui/logos/dakshclasses-logo';



export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex shrink-0 h-30 items-center justify-center  bg-blue-600 p-4 md:h-30">
        <DakshClassesLogo />
      </div>

      <div className="h-56 grid grid-cols-3 gap-4 content-start flex shrink-0 items-end  bg-blue-600 p-4 md:h-10">
        <div>
         
          
        </div>
        <div>

        </div>
       
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row py-5">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* <div /> */}
          <p className={` ${lusitana.className} text-xl text-gray-800 md:text-2xl md:leading-normal`}>
            At Daksh Classes, we’re all about making things easier, smarter, and more fun. </p>
          <p className={` ${lusitana.className} text-xl text-gray-800 md:text-2xl md:leading-normal`}>
            Dive into a world where great ideas come to life and success is just a step away. </p>
         


          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          {/* <Image
            src="/sitelogo.jpg"
            width={500}
            height={500}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          /> */}
        </div>
      </div>
    </main>
  );
}
