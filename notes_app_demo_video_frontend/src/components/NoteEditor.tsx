import React from 'react';
import { Theme } from '../theme';
import { Note } from '../data/sampleNotes';

type NoteEditorProps = {
  theme: Theme;
  note: Note;
  highlight?: 'title' | 'content' | 'toolbar';
  watermark?: string;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditor
 * Simulates the editing area for a note with toolbar and content.
 */
export const NoteEditor: React.FC<NoteEditorProps> = ({
  theme,
  note,
  highlight,
  watermark,
}) => {
  const ring =
    highlight === 'title'
      ? '0 0 0 4px rgba(37,99,235,0.18)'
      : highlight === 'content'
      ? 'inset 0 0 0 2px rgba(37,99,235,0.6)'
      : 'none';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 16,
        background: '#fff',
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadowSm,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 14px',
          borderBottom: `1px solid ${theme.colors.border}`,
          background: 'linear-gradient(180deg, #fff, rgba(255,255,255,0.9))',
        }}
      >
        {['B', 'I', 'H1', 'H2', '•', '✓'].map((t, idx) => {
          const active = highlight === 'toolbar' && idx < 2;
          return (
            <div
              key={t}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                background: active ? theme.colors.primary : '#fff',
                color: active ? '#fff' : theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                fontWeight: 600,
                fontSize: 12,
                boxShadow: active ? theme.shadowSm : 'none',
              }}
            >
              {t}
            </div>
          );
        })}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              background: theme.colors.secondary,
              color: '#111827',
              fontWeight: 600,
              fontSize: 12,
              boxShadow: theme.shadowSm,
            }}
          >
            Save
          </div>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              background: '#fff',
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.muted,
              fontSize: 12,
            }}
          >
            More
          </div>
        </div>
      </div>

      {/* Title */}
      <input
        readOnly
        value={note.title}
        style={{
          outline: 'none',
          border: 'none',
          fontSize: 24,
          fontWeight: 700,
          padding: '16px 18px',
          borderBottom: `1px solid ${theme.colors.border}`,
          boxShadow: highlight === 'title' ? ring : 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: 18,
          fontSize: 16,
          lineHeight: 1.6,
          color: theme.colors.text,
          position: 'relative',
          boxShadow: highlight === 'content' ? ring : 'none',
          whiteSpace: 'pre-wrap',
        }}
      >
        {note.content}
        {watermark ? (
          <div
            style={{
              position: 'absolute',
              right: 12,
              bottom: 10,
              fontSize: 11,
              color: theme.colors.muted,
            }}
          >
            {watermark}
          </div>
        ) : null}
      </div>
    </div>
  );
};
