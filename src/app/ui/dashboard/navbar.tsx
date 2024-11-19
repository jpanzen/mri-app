import Image from "next/image"

export default function Navbar() {
    return(
        <div className="2xl:px-[300px] lg:px-[120px] md:px-[60px] px-[20px] py-[20px] border-b border-gray10 flex flex-row items-center justify-between bg-navbar bg-cover bg-center">
            <div className="flex flex-row gap-[10px] items-center">
                <Image src="/images/doktor1.jpeg" width={48} height={48} alt="logged in user" className="rounded-[24px]" />
                <div>
                    <p className="text-[12px]">Přihlášený/á:</p>
                    <p className="font-bold">MUDr. Marie Panzenbergerová</p>
                </div>
            </div>
            <div className="flex flex-row gap-[20px]">
                <Image src="/info.svg" width={24} height={24} alt="Info icon"/>
                <Image src="/exit.svg" width={24} height={24} alt="Logout icon"/>
            </div>
        </div>
    )
}