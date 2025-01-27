const POLLINATIONS_API_URL = "https://image.pollinations.ai/prompt";

export const generateImage = async (
  prompt: string,
  options?: {
    width?: number;
    height?: number;
    nologo?: boolean;
    seed?: number;
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
  
  return url;
}; 