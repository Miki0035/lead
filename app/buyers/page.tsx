import  BuyerTable  from "@/components/BuyerTable"


const Buyers = async ({ searchParams }: { searchParams: { page?: string } }) => {

  const page = Number(searchParams.page ?? 1)
  const limit = 10;

  const buyers = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/buyers/?page=${page}&limit=${limit}`, { cache: "no-store" })
  const { data, pagination }: { data: BuyerType[], pagination: { page: number, limit: number, total: number, totalPages: number } } = await buyers.json()
console.log(`pagination from server`, pagination)
  return (
    <main className='w-full h-full'>
      {/* <section className='w-full h-full grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4'>
        <Link href={`/buyers/${lead.id}`} className="border-[0.5px] px-3 py-2">
          <h4>Buyer Full name: <span>{lead.fullname} </span> </h4>
          <h4>Buyer email address: {lead.email}</h4>
          <h4>Property Location: {lead.city}</h4>
          <h4>Property type: {lead.property}</h4>
          <p>BHK: {lead.bhk ? lead.bhk : 'has no bhk'}</p>
          <p>Purpose: {lead.purpose}</p>
          <p>Min Budget : {lead.budgetMin}</p>
          <p>Max Budget : {lead.budgetMax}</p>
          <p>Timeline : {lead.timeline}</p>
          <p>Source : {lead.source}</p>
          <p>Property Status : {lead.status}</p>
          <p>Notes : {lead.notes ? lead.notes : "No notes"}</p>
          <p>Tags : {lead.tags ? lead.tags : "No tags"}</p>
        </Link>
      </section> */}

      <BuyerTable buyers={data} pagination={pagination} />
    </main>
  )
}

export default Buyers