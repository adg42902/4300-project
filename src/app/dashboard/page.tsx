//View of top tracks/genres/artists
import Logout from "../components/Logout";
import Tracks from "../components/Tracks";

export default function Dashboard() {
  return (
    <div className="relative flex flex-col items-center w-full h-screen mt-4">
      <h1 className="text-2xl font-bold text-center w-full mt-1">Dashboard</h1>
      <div className="absolute right-4">
        <Logout />
      </div>
      <Tracks />
    </div>
  );
}
