let syncTimeout: NodeJS.Timeout | null = null;

export async function loadConfig() {
  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to load config:', error);
  }
  return null;
}

export function saveConfig(config: any) {
  if (syncTimeout) clearTimeout(syncTimeout);
  
  syncTimeout = setTimeout(async () => {
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }, 1000);
}

export function syncAllStores() {
  if (typeof window === 'undefined') return;
  
  const dashboardData = localStorage.getItem('dashboard-storage');
  const settingsData = localStorage.getItem('settings-storage');
  const themeData = localStorage.getItem('theme-storage');
  
  const widgets = dashboardData ? (JSON.parse(dashboardData).state?.widgets || []) : [];
  const settings = settingsData ? (JSON.parse(settingsData).state || {}) : {};
  const theme = themeData ? (JSON.parse(themeData).state || { mode: 'dark' }) : { mode: 'dark' };
  
  console.log('Syncing to backend:', { widgets, settings, theme });
  saveConfig({ widgets, settings, theme });
}
