import { fetchFilteredPatients } from "@/app/lib/fetch";
import Link from "next/link";
import Image from "next/image";

export default async function PatientList({ query }: { query: string }) {
  const patients = await fetchFilteredPatients(query);
  console.log(patients);
  
  return (
    <div>
      <ul className="flex flex-col gap-[20px]">
        {patients.map((patient) => (
          <li key={patient.id} className="flex flex-row bg-gray2 rounded-[6px] border-[1px] border-gray10 p-[10px] justify-between items-center">
            <div className="flex flex-row items-center gap-[10px]">
              <Image src={patient.photoUrl} width={48} height={48} alt={`Photo of ${patient.name}`} className="rounded-[6px]" />
              <p className="text-[24px] text-gray40 font-medium">{patient.name}</p>
            </div>
            <Link href={{ pathname: '/dashboard/patient', query: {id: patient.id} }} className="px-[16px] py-[10px] rounded-[6px] bg-gray10">
              <Image src="eye.svg" width={24} height={24} alt="Eye icon"/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}