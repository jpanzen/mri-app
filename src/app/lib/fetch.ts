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