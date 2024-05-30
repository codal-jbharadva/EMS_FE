const BackendPort = 3001;

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body: any = null,
  options: {
    authToken?: string,
    isFile?: boolean,
    headers?: Record<string, string>,
    isSignUp?: boolean
  } = {}
): Promise<any> => {
  const { authToken, isFile = false, headers = { "Content-Type": "application/json" }, isSignUp = false } = options;

  try {
    const response = await fetch(`http://localhost:${BackendPort}/${endpoint}`, {
      method,
      headers: authToken? isFile ? {'Authorization': `Bearer ${authToken}`} : {...headers, 'Authorization': `Bearer ${authToken}`} :  isSignUp?undefined:headers,
      body: method === "POST" ? (isFile ? body : JSON.stringify(body)) : undefined
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      return {
        success: false,
        data: responseData.message || `HTTP error! Status: ${response.status}`
      };
    }
    
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { success: false, data: "Failed to fetch data" };
  }
};
