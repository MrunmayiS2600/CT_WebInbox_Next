let clevertapInstance: any = null;

export const getCleverTap = async () => {
  if (typeof window === "undefined") return null;

  if (clevertapInstance) return clevertapInstance;

  // Dynamically import only on client
  await import("clevertap-web-sdk");

  // SDK attaches itself to window
  const clevertap = (window as any).clevertap;

  if (!clevertap) {
    console.error("CleverTap failed to load");
    return null;
  }

  clevertap.init("ZWW-WWW-WWRZ", "eu1");

  clevertap.spa = true;

  clevertapInstance = clevertap;

  return clevertapInstance;
};
