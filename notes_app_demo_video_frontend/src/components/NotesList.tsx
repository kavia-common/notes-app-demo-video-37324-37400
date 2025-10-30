import React from 'react';
import { Theme } from '../theme';
import { Note } from '../data/sampleNotes';

type NotesListProps = {
  theme: Theme;
  notes: Note[];
  selectedId?: string;
  hint?: string;
};

/**
 * PUBLIC_INTERFACE
 * NotesList
 * Displays notes in the sidebar, highlighting the selected one.
 * The style uses rounded corners, subtle shadows and pastel note backgrounds.
 */
export const NotesList: React.FC<NotesListProps> = ({
  theme,
  notes,
  selectedId,
  hint,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            background: theme.colors.primary,
            color: 'white',
            fontSize: 12,
            boxShadow: theme.shadowSm,
          }}
        >
          + New Note
        </div>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            background: '#fff',
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.muted,
            fontSize: 12,
          }}
        >
          Filter • All
        </div>
      </div>

      {notes.map((n) => {
        const selected = n.id === selectedId;
        return (
          <div
            key={n.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: 14,
              borderRadius: 12,
              background: selected ? '#FFFFFF' : n.color || '#FFFFFF',
              border: `1px solid ${selected ? theme.colors.primary : theme.colors.border}`,
              boxShadow: selected ? theme.shadowSm : 'none',
              cursor: 'default',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontWeight: 600 }}>{n.title}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {n.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      padding: '4px 8px',
                      borderRadius: 999,
                      background:
                        tag === 'ideas'
                          ? theme.colors.secondary
                          : 'rgba(37, 99, 235, 0.15)',
                      color: tag === 'ideas' ? '#111827' : theme.colors.primary,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: theme.colors.muted,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={n.content}
            >
              {n.content.replace(/\n/g, ' • ')}
            </div>
          </div>
        );
      })}

      {hint ? (
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            color: theme.colors.muted,
            textAlign: 'center',
          }}
        >
          {hint}
        </div>
      ) : null}
    </div>
  );
};
