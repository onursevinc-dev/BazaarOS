import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SellerProductsPage({
  params,
}: {
  params: { storeUrl: string };
}) {
  return (
    <div>
      seller products page
      <Link href={`/dashboard/seller/stores/${params.storeUrl}/products/new`}>
        <Button>New Product page</Button>
      </Link>
    </div>
  );
}
