import { GlobeAltIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'


export default function DakshClassesLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col items-center leading-none text-white`}
    >
      {/* <AcademicCapIcon className="h-12 w-12" /> */}
      <p className="text-[44px] underline"> DAKSH CLASSES</p>
      <p>&nbsp;</p>
      <p className="text-[35px]"> [ An Ideal Institution for School Education ]</p>
      <p>&nbsp;</p>
      <p className="text-[30px]"> 106, Shiven Shoppers, Adajan, Surat - 9</p>
      <p>&nbsp;</p>
      <p className="text-[30px]"> Proprietor : Mr. Pratik Gohel (Mobile : 9909435005) </p>
    </div>
  );
}
