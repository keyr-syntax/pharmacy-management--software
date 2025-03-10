import RecycleBinForDeletedInventories from "./RecycleBinForDeletedInventories";
import RecycleBinForDeletedProducts from "./RecycleBinForDeletedProducts";
import DeletedUsersList from "./RecycleBinForDeletedUsers";
import RecycleBinForProductPricing from "./RecycleBinForProductPricing";

export default function AllRecycleBin() {
  return (
    <>
      <DeletedUsersList />
      <RecycleBinForDeletedProducts />
      <RecycleBinForDeletedInventories />
      <RecycleBinForProductPricing />
    </>
  );
}
