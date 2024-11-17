import { fetchFilteredPatients } from "@/app/lib/fetch";

export default async function PatientList({ query }: { query: string }) {
  const patients = await fetchFilteredPatients(query);

  console.log(patients);
  
  return (
    <div>
      <h1>Patient List</h1>

      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <p><strong>{patient.name}</strong></p>
            <p>Email: {patient.email}</p>
            <p>Address: {patient.address}</p>
            <img src={patient.photoUrl} alt={`Photo of ${patient.name}`} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}