import PatientList from "@/app/ui/dashboard/patient-list"
import Search from "@/app/ui/dashboard/search"

export default async function Page(props: {
    searchParams?: Promise<{
      patient?: string;
    }>;
  }){

    const searchParams = await props.searchParams;
    const patient = searchParams?.patient || '';
    return(
        <div>
            <p>heyy</p>
            <Search placeholder="Vyhledejte pacienta"/>
            <PatientList query={patient}/>
        </div>
    )
}