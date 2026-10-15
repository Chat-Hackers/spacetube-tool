import "./App.css";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export default function App() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  return (
    <>
      <h1>Spacetube</h1>
    </>
  );
}
