export const OceanTheme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(17,24,39,0.08)',
    gradientFrom: 'rgba(59,130,246,0.08)',
    gradientTo: 'rgba(249,250,251,1)',
  },
  radius: 14,
  shadowLg: '0 10px 30px rgba(17,24,39,0.12), 0 2px 6px rgba(17,24,39,0.06)',
  shadowSm: '0 4px 14px rgba(17,24,39,0.08)',
};

export type Theme = typeof OceanTheme;
