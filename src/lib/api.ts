const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? "" 
  : import.meta.env.VITE_API_URL || "https://cheatsheets-api.onrender.com";

export interface Route {
  id: string;
  title: string;
  description: string;
  tags: string[];
  locked: boolean;
  visible: boolean;
  created_at: string;
  updated_at: string;
  path?: string;
  name?: string;
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const fetchRoutes = async (): Promise<Route[]> => {
  try {
    const url = `${API_BASE_URL}/notes`;
    console.log("Fetching routes from:", url, "(dev:", isDevelopment, ")");
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: Route[] = await response.json();
    console.log("Successfully fetched routes:", data);

    return data.map((item) => ({
      ...item,
      path: `/${slugify(item.title)}`,
      name: item.title,
    }));
  } catch (error) {
    console.error("Failed to fetch routes:", error);
    return [];
  }
};

export const fetchNoteById = async (id: string): Promise<Route | null> => {
  try {
    const url = `${API_BASE_URL}/notes/${id}`;
    console.log("Fetching note from:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: Route = await response.json();
    console.log("Successfully fetched note:", data);
    
    return data;
  } catch (error) {
    console.error("Failed to fetch note:", error);
    return null;
  }
};
