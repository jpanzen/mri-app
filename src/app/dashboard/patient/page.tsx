"use client";

import { useState, useEffect } from "react";
import { fetchPatientById, updatePatientDiagnosis } from "@/app/lib/fetch";
import Link from "next/link";

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
        await updatePatientDiagnosis(patientId.toString()+"00", diagnosis);
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="diagnosis">Diagnóza</label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={4}
              required
            />
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? "Aktualizuji..." : "Aktualizovat"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Diagnóza byla úspěšně aktualizována.</p>}
          </form>
        </>
      )}
    </div>
  );
}