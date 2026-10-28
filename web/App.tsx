import "./App.css";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getConnection, deleteConnection } from "./requests";

export default function App() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [tubeConnection, setTubeConnection] = useState("");

  const loadConnection = async () => {
    const connection = await getConnection(roomId as string);
    console.log(connection);
  };

  useEffect(() => {
    loadConnection();
  }, []);

  const removeConnection = async () => {
    await deleteConnection(roomId as string);
  };

  return (
    <>
      <h1>Spacetube</h1>
      {tubeConnection ? (
        <>
          <p>Your tube is connected</p>
          <button onClick={removeConnection}>Remove Connection</button>
        </>
      ) : (
        <p>
          React to a message in your group with the 🛸 emoji to set up a
          spacetube
        </p>
      )}
    </>
  );
}
