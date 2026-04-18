async function fetchModel(url) {
  try {
    const response = await fetch(`http://localhost:5000/api/${url}`);

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchModel error:", error);
    return null;
  }
}

export default fetchModel;
