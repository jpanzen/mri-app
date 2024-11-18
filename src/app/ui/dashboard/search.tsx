'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('patient', term);
        } else {
            params.delete('patient');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <div className="relative flex flex-1 flex-shrink-0 my-[60px]">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-[6px] border border-gray10 p-[9px] text-sm outline-2 placeholder:text-gray40 bg-gray2"
                placeholder={placeholder}
                onChange={(e) => {
                handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('patient')?.toString()}
            />
        </div>
    )
}