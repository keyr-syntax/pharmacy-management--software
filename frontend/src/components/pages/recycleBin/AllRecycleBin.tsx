import RecycleBinForDeletedInventories from "./RecycleBinForDeletedInventories";
import RecycleBinForDeletedProducts from "./RecycleBinForDeletedProducts";
import DeletedUsersList from "./RecycleBinForDeletedUsers";

export default function AllRecycleBin() {
  return (
    <>
      <DeletedUsersList />
      <RecycleBinForDeletedProducts />
      <RecycleBinForDeletedInventories />
    </>
  );
}
