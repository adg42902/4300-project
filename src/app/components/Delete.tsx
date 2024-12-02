interface DeleteProps {
  id: string;
  onDelete: (id: string) => void;
}

export default function Delete({ id, onDelete }: DeleteProps) {
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/playlists/usersPlaylists", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Could not delete playlist: ", data.message);
      }
    } catch (error: any) {
      console.log(error);
    }
    onDelete(id);
  };

  return (
    <button
      className="border-2 border-red-400 rounded px-1 hover:bg-red-400 transition ease-in-out"
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
}
