const BackendPort = 3001;

export const apiRequest = async (
    url: string,
    method: "GET" | "POST",
    body?: any,
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:3001/${url}`, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  };
