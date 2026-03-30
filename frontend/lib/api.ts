export async function askLegalAI(question: string, department: string) {
  const response = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      department,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
}