import AddTagDialogButton from "@/components/tag/add-tag-dialog";
// import { DataTable } from "@/components/tag/table/data-table";
import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import NotImplemented from "@/components/not-implemented";
import PageWrapper from "@/components/page-wrapper";


export default async function Controlss() {

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow' >


      <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row ">
        <div className="flex flex-col grow">
          <h1 className="text-xl font-semibold grow">
            <Icons.controls className="inline-block w-5 h-5 mr-2" />
            Controls</h1>
        </div>
        <div className="flex justify-end">
          {/* <AddTagDialogButton /> */}
        </div>
      </div>

      <div className="h-full ">
        <NotImplemented />
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}