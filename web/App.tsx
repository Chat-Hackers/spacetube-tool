import "./App.css";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getConnection, deleteConnection } from "./requests";

export default function App() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [tubeConnection, setTubeConnection] = useState("");

  const loadConnection = async () => {
    const connectionResponse = await getConnection(roomId as string);
    const connection = await connectionResponse.json();
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
