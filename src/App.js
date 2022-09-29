import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(null);
  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      let file = event.target[0].files[0];
      const url = `http://localhost:3001/presign`;
      const params = new URLSearchParams({
        key: file.name,
      });
      let resp = await fetch(url, {
        method: "POST",
        body: params,
      });
      let presignResp = await resp.json();

      console.log("presign resp", presignResp);

      resp = await fetch(presignResp.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      console.log("resp", resp);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit}>
          <input type="file" />
          <br />
          <button disabled={loading}>Upload!</button>
        </form>
      </header>
    </div>
  );
}

export default App;
