import React from 'react';
import { Theme } from '../theme';

type StatusToastProps = {
  theme: Theme;
  text: string;
  tone?: 'info' | 'success' | 'error';
  align?: 'left' | 'right';
};

/**
 * PUBLIC_INTERFACE
 * StatusToast
 * A small toast to surface actions: Created, Saved, Tagged, Deleted.
 */
export const StatusToast: React.FC<StatusToastProps> = ({
  theme,
  text,
  tone = 'info',
  align = 'right',
}) => {
  const bg =
    tone === 'success'
      ? theme.colors.success
      : tone === 'error'
      ? theme.colors.error
      : theme.colors.primary;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        [align]: 24,
        padding: '10px 14px',
        borderRadius: 12,
        color: '#fff',
        background: bg,
        boxShadow: theme.shadowSm,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  ) as any;
};
