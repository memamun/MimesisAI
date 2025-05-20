const POLLINATIONS_API_URL = "https://image.pollinations.ai/prompt";

export const generateImage = async (
  prompt: string,
  options?: {
    width?: number;
    height?: number;
    nologo?: boolean;
    seed?: number;
    timeout?: number;
    maxRetries?: number;
  }
) => {
  const params = new URLSearchParams({
    width: (options?.width || 1024).toString(),
    height: (options?.height || 1024).toString(),
    nologo: (options?.nologo || true).toString(),
    seed: (options?.seed || Math.floor(Math.random() * 1000)).toString(),
  });

  const encodedPrompt = encodeURIComponent(prompt);
  const url = `${POLLINATIONS_API_URL}/${encodedPrompt}?${params}`;
  
  // Set a reasonable timeout (15 seconds by default)
  const timeout = options?.timeout || 15000;
  const maxRetries = options?.maxRetries || 2;
  
  let lastError: Error | null = null;
  
  // Try multiple times with increasing delays
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Wait with exponential backoff before retrying
      if (attempt > 0) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`Retry attempt ${attempt} for image: ${prompt.substring(0, 30)}...`);
      }
      
      // Use a HEAD request to check if the URL works and is valid
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.warn(`Warning: Image URL returned status ${response.status} (attempt ${attempt + 1}/${maxRetries + 1})`);
        if (attempt === maxRetries) {
          // On last attempt, return the URL anyway as the browser might still load it
          return url;
        }
        throw new Error(`Image URL returned status ${response.status}`);
      }
      
      // Success - return the URL
      return url;
    } catch (error) {
      console.warn(`Warning: Could not validate image URL (attempt ${attempt + 1}/${maxRetries + 1}): ${error}`);
      lastError = error as Error;
      
      // If it's the last attempt, return the URL anyway
      if (attempt === maxRetries) {
        return url;
      }
    }
  }
  
  // This should never be reached due to the return in the last attempt, but just in case
  return url;
}; 