export async function getUserInfo() {
  try {
    const response = await fetch("/api/user-info", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("User not authenticated");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
