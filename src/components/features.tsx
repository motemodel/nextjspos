import AppLoading from "@/app/components/AppLoading";
import { useProduct } from "@/hooks/use-product";

function Features() {
  const { products, loading, error } = useProduct();
  if (loading) return <AppLoading />;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center">
          รายการสินค้าทั้งหมด
        </h2>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-(--breakpoint-lg) mx-auto px-6">
          {products && products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border rounded-xl py-6 px-5">

              <span className="text-lg font-semibold">{item.barcode}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {item.name} {item.price} บาท
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
