const BackendPort = 3001;

export const apiRequest = async (
    url: string,
    method: "GET" | "POST",
    body?: any,
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:${BackendPort}/${url}`, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(body) : undefined,
      });
      const responseData = await response.json();
      console.log(responseData)
      
      if (!response.ok) {
        return {success: false, data : responseData.message || `HTTP error! Status: ${response.status}`}
      }
      return {success:true, data: responseData};
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  };
