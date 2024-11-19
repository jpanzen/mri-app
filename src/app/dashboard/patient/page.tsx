"use client";

import { useState, useEffect } from "react";
import { fetchPatientById, updatePatientDiagnosis } from "@/app/lib/fetch";
import Link from "next/link";
import Image from "next/image";

export default function Page(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const [patient, setPatient] = useState<any>(null);
  const [patientId, setPatientId] = useState<number>(1);
  const [diagnosis, setDiagnosis] = useState<string>(""); 
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadPatient = async () => {
      const searchParams = await props.searchParams;
      const id = Math.max(1, Math.min(6, Number(searchParams?.id) || 1));
      setPatientId(id);
      const patientData = await fetchPatientById(id);
      setPatient(patientData);
      setDiagnosis(patientData.diagnosis || "");
      setSuccess(false);
      setError(null);
    };

    loadPatient();
  }, [props.searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    if (diagnosis) {
      try {
        await updatePatientDiagnosis(patientId.toString(), diagnosis);
        setSuccess(true);
      } catch (error) {
        console.error("Chyba při aktualizaci diagnózy:", error);
        setError("Nepodařilo se aktualizovat diagnózu. Zkuste to prosím znovu.");
      } finally {
        setIsUpdating(false);
      }
    } else {
      setError("Vyplňte diagnózu.");
      setIsUpdating(false);
    }
  };

  return (
    <div>
      {patient && (
        <>
          <div className="flex flex-row gap-[10px] justify-end pt-[60px] pb-[20px]">
            {patientId > 1 && (
              <Link href={{ pathname: "/dashboard/patient", query: { id: patientId - 1 } }} className="px-[8px] py-[8px] bg-foreground rounded-[6px]">
                <Image src="/right.svg" width={24} height={24} alt="Left icon" className="rotate-180" />
              </Link>
            )}
            {patientId < 6 && (
              <Link href={{ pathname: "/dashboard/patient", query: { id: patientId + 1 } }} className="px-[8px] py-[8px] bg-foreground rounded-[6px]">
                <Image src="/right.svg" width={24} height={24} alt="Left icon" />
              </Link>
            )}
            <Link href={{ pathname: "/dashboard" }} className="flex flex-row px-[8px] py-[8px] bg-foreground rounded-[6px] gap-[10px]">
              <Image src="/people.svg" width={24} height={24} alt="People icon" />
              <p className="font-bold text-background">Seznam pacientů</p>
            </Link>
          </div>
          
          

          <div className="flex flex-row mb-[60px]">
            <div className="flex flex-col gap-[20px] w-full">
              <h1 className="text-[36px] font-bold">{patient.name}</h1>
              <Image src={patient.photoUrl} width={148} height={148} alt={`Photo of ${patient.name}`} className="rounded-[12px] border-[1px] border-gray10" />
              <div className="flex flex-row text-[21px] gap-[40px]">
                <div>
                  <p>Věk:</p>
                  <p>Pohlaví:</p>
                  <p>Telefon:</p>
                  <p>Email:</p>
                </div>
                <div>
                  <p>{patient.age}</p>
                  <p>{patient.gender}</p>
                  <p className="underline"><Link href={`tel:${patient.phone}`}>{patient.phone}</Link></p>
                  <p className="underline"><Link href={`mailto:${patient.email}`}>{patient.email}</Link></p>
                </div>
              </div>
            </div>
            <div className="w-full h-auto relative">
              <Image src={patient.mriUrl} alt={`MRI of ${patient.name}`} fill objectFit="cover" className="rounded-[12px]" />
            </div>
          </div>


          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <label htmlFor="diagnosis" className="hidden">Diagnóza</label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={4}
              required
              className="rounded-[6px] bg-gray2 border-[1px] border-gray10 p-[10px] text-gray40 w-full h-fit"
            />
            <div>
              <button type="submit" disabled={isUpdating} className="flex flex-row gap-[10px] p-[10px] pr-[16px] rounded-[6px] bg-greenButtons text-background font-bold">
                <Image src="/save.svg" width={24} height={24} alt="Save icon" />
                {isUpdating ? "Aktualizuji..." : "Aktualizovat"}
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Diagnóza byla úspěšně aktualizována.</p>}
          </form>
        </>
      )}
    </div>
  );
}