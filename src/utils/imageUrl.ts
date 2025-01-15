export async function extractImageUrlFromHTML(
    htmlUrl: string
  ): Promise<string | null> {
    try {
      const response = await fetch(htmlUrl);
      const html = await response.text();
      const imageUrlRegex = /<meta\s+property="og:image"\s+content="([^"]+)"/;
      const match = imageUrlRegex.exec(html);
      return match ? match[1] : null;
    } catch (error) {
      console.error("Error fetching HTML:", error);
      return null;
    }
  }