import { GraphQLClient } from 'graphql-request';
import { Patient } from '@/app/lib/definitions';

const endpoint = 'http://localhost:4000/graphql';
const client = new GraphQLClient(endpoint);

export async function fetchFilteredPatients(searchFor: string): Promise<Patient[]> {
  console.log(`hledááme ${searchFor}`);
  const query = `
    query SearchPatientByName {
        searchPatientByName(name: "${searchFor}") {
            id
            name
            age
            gender
            email
            phone
            address
            photoUrl
            mriUrl
            diagnosis
        }
    }
  `;

  try {
    const data = await client.request<{ searchPatientByName: Patient[] }>(query);
    return data.searchPatientByName;
  } catch (error) {
    console.error('Chyba při načítání pacientů:', error);
    throw new Error('Nepodařilo se načíst data');
  }
}

export async function fetchPatientById(searchFor: number): Promise<Patient> {
  console.log(`hledááme id ${searchFor}`);
  const query = `
    query SearchPatientById {
      searchPatientById(id: "${searchFor}") {
        id
        name
        age
        gender
        email
        phone
        address
        photoUrl
        mriUrl
        diagnosis
      }
    }
  `;
  try{
    const data = await client.request<{ searchPatientById: Patient }>(query);
    return data.searchPatientById;
  } catch (error){
    console.error('Chyba při hledání pacienta:', error);
    throw new Error('Nepodařilo se načíst data');
  }
}

export async function updatePatientDiagnosis(searchFor: string, diagnosis: string) {
  console.log(`Aktualizujeme diagnózu pro pacienta s ID ${searchFor}`);

  const query = `
    mutation UpdateDiagnosis {
      updateDiagnosis(id: "${searchFor}", diagnosis: "${diagnosis}") {
        id
        name
        age
        gender
        email
        phone
        address
        photoUrl
        mriUrl
        diagnosis
      }
    }
  `;

  console.log(query);

  try {
    const data = await client.request<{ updateDiagnosis: Patient }>(query);
    return data.updateDiagnosis;
  } catch (error) {
    console.error('Chyba při aktualizaci diagnózy:', error);
    throw new Error('Nepodařilo se aktualizovat diagnózu');
  }
}