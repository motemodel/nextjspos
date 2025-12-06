'use client'
import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useProductByBarcode } from "@/hooks/use-product-by-barcode"

// import data from "./data.json"

export default function Page() {

  const { data } = useProductByBarcode("8851234567900");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {JSON.stringify(data)}

              
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} /> */}

              <div className="flex flex-1 flex-col p-4 md:p-6 gap-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">ระบบจุดขาย (POS)</h1>
                  <p className="text-muted-foreground">
                    สแกนบาร์โค้ดหรือกรอกรหัสสินค้าเพื่อเพิ่มสินค้าเข้าตะกร้า
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>สแกนบาร์โค้ด</CardTitle>
                  </CardHeader>
                  <CardContent>
                    bar code input
                  </CardContent>
                </Card>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>รายการสินค้า</CardTitle>
                      </CardHeader>
                      <CardContent>
                        table
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    pos summary


                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
