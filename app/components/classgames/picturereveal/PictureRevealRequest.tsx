import * as React from "react";

// this is a test concept for Dall-E image generation - route mostly working except for NextResponse data return to client
// needs clean up and proper processing of return data and error catching


export function PictureRevealRequest() {
  async function handleRequest() {
    const DUMMY_REQ = "a picture of a cat";

    const response = await fetch("api/generators/picture-reveal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DUMMY_REQ,
      }),
    });
    console.log("Response: ", response);
  }

  return (
    <div>
      <button onClick={handleRequest}>Click me</button>
    </div>
  );
}
