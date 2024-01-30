export default async function saveFunc(saveData: {} | [] | undefined) {
  try {
    const response = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    });

    if (response.ok) {
      console.log("Response is ok - Save successful.");
    }

    if (!response.ok) {
      console.log("Response not ok. Save failed in handleSave.ts");
      throw new Error("Save failed.")
    }
  } catch (error: any) {
    console.log("Caught error in handleSave.ts - Save failed.");
    throw new Error("Save failed.")
  }
} 