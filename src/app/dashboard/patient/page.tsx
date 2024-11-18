import { fetchPatientById } from "@/app/lib/fetch";
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const patientId = Math.max(1, Math.min(6, Number(searchParams?.id) || 1));
  const patient = await fetchPatientById(patientId);

  console.log(patient);
  return (
    <div>
      {patientId > 1 && (
        <Link href={{ pathname: "/dashboard/patient", query: { id: patientId - 1 } }}>
          Zpět
        </Link>
      )}
      {patientId < 6 && (
        <Link href={{ pathname: "/dashboard/patient", query: { id: patientId + 1 } }}>
          Další
        </Link>
      )}
      <Link href={{ pathname: "/dashboard" }}>Seznam</Link>
      <h1>{patient.name}</h1>
    </div>
  );
}