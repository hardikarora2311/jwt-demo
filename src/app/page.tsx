"use client";

import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");
  const [manualToken, setManualToken] = useState("");
  const [protectedData, setProtectedData] = useState("");

  const login = async () => {
    const response = await fetch("/api/login", { method: "POST" });
    const data = await response.json();
    setToken(data.token);
  };

  const fetchProtectedData = async (useManualToken: boolean = false) => {
    const tokenToUse = useManualToken ? manualToken : token;
    try {
      const response = await fetch("/api/secure", {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProtectedData(JSON.stringify(data.message));
        console.log(tokenToUse);
      } else {
        setProtectedData("Unauthorized");
        console.log(tokenToUse);
      }
    } catch (error) {
      setProtectedData("Error fetching data");
    }
  };

  return (
      <main className="flex flex-col min-h-screen justify-between p-24 mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="w-full text-sm flex flex-col">
          <h1 className="text-4xl font-bold mb-8 mx-auto">JWT Demo App</h1>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={login}
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => fetchProtectedData(false)}
            >
              Fetch Protected Data
            </button>
          </div>

          <div className="mt-4 ">
            {" "}
            <span className="font-semibold">Token: </span> {token}
          </div>
          <div className="mt-4">
            {" "}
            <span className="font-semibold">Protected Data: </span>
            {protectedData}
          </div>

          <div className="mt-8">
            <input
              type="text"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              placeholder="Paste token here"
              className="border-2 border-gray-300 p-2 w-full text-zinc-700"
            />
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-6"
              onClick={() => fetchProtectedData(true)}
            >
              Test Manual Token
            </button>
          </div>
        </div>
        <Footer />
      </main>
  );
}
