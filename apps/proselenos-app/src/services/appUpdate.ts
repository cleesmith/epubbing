// Shared by the Library and Authors menus. App files only; no book data.
export async function updateApp(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
      await caches.delete(name);
    }
    window.location.reload();
  } catch (error) {
    console.error('Update app error:', error);
  }
}
