export default async function handleDataSave(saveData: {} | []) {
  try {
    const response = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    });

    if (response.ok) {
      console.log("Save successful.");
    }

    if (!response.ok) {
      console.log("Save failed.");
      throw new Error("Save failed.")
    }
  } catch (error: any) {
    console.log("Save failed.");
    throw new Error("Save failed.")
  }
}