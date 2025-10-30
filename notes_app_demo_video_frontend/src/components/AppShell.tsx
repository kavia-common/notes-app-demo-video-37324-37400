import React from 'react';
import { Theme } from '../theme';

type AppShellProps = {
  theme: Theme;
  headerRight?: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
};

const headerHeight = 72;
const sidebarWidth = 420;

/**
 * PUBLIC_INTERFACE
 * AppShell
 * This component renders the simulated app chrome: header, sidebar and editor panel.
 * Style is aligned with the Ocean Professional theme (rounded corners, subtle shadows).
 */
export const AppShell: React.FC<AppShellProps> = ({
  theme,
  headerRight,
  sidebar,
  content,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${theme.colors.gradientFrom}, ${theme.colors.gradientTo})`,
        color: theme.colors.text,
        fontFamily: 'Inter, SF Pro Text, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        padding: 28,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: theme.radius + 6,
          background: theme.colors.surface,
          boxShadow: theme.shadowLg,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            height: headerHeight,
            borderBottom: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.7))',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: theme.colors.primary,
                boxShadow: theme.shadowSm,
              }}
            />
            <div style={{ fontWeight: 700, letterSpacing: 0.2 }}>Notes</div>
          </div>
          <div>{headerRight}</div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Sidebar */}
          <div
            style={{
              width: sidebarWidth,
              borderRight: `1px solid ${theme.colors.border}`,
              background: theme.colors.background,
              padding: 18,
              boxSizing: 'border-box',
            }}
          >
            {sidebar}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 24, boxSizing: 'border-box' }}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export const dimensions = {
  headerHeight,
  sidebarWidth,
};
