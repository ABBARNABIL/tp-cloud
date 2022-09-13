import React, { useState, useEffect } from "react";

function App() {
  const [visitors, setVisitors] = useState(false);

  useEffect(() => {
    getVisitors();
  }, []);

  function getVisitors() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setVisitors(data);
      });
  }

  function createVisitor() {
    let name = prompt("Enter visitor name");
    let email = prompt("Enter visitor email");
    fetch("http://localhost:3001/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getVisitors();
      });
  }

  function deleteVisitor() {
    let id = prompt("Enter visitor id");
    fetch(`http://localhost:3001/visitors/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getVisitors();
      });
  }

  return (
    <div>
      {visitors ? visitors : "There is no visitor data available"}
      <br />
      <button onClick={createVisitor}>Add visitor</button>
      <br />
      <button onClick={deleteVisitor}>Delete visitor</button>
    </div>
  );
}
export default App;
