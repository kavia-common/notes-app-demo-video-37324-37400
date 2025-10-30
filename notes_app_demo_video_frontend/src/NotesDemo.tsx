import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { OceanTheme } from './theme';
import { AppShell } from './components/AppShell';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { StatusToast } from './components/StatusToast';
import { AnimatedCursor } from './components/AnimatedCursor';
import { Note, sampleNotes } from './data/sampleNotes';

/**
 * PUBLIC_INTERFACE
 * NotesDemo
 * Main visual that animates create, edit, organize and delete flows for a Notes app.
 * - 1920x1080, 30fps by default
 * - Smooth fades, slides, and subtle zooms
 * - Ocean Professional theme
 */
export const NotesDemo: React.FC<{
  /** Toggle debug to show frame counters or outlines. */
  debug?: boolean;
}> = ({ debug = false }) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Timeline (change as needed ~45s = 1350 frames at 30fps)
  const introEnd = 120; // 4s
  const createStart = introEnd;
  const createEnd = createStart + 210; // 7s
  const editStart = createEnd;
  const editEnd = editStart + 240; // 8s
  const organizeStart = editEnd;
  const organizeEnd = organizeStart + 270; // 9s
  const deleteStart = organizeEnd;
  const deleteEnd = deleteStart + 210; // 7s
  const outroStart = deleteEnd;
  const outroEnd = outroStart + 120; // 4s

  // base data
  const notesBase = useMemo(() => sampleNotes, []);
  const createdNote: Note = useMemo(
    () => ({
      id: 'new',
      title: 'Meeting Notes',
      content:
        'Agenda:\n1) Timeline\n2) Responsibilities\n3) Open questions',
      tags: ['work'],
      color: '#DCFCE7',
    }),
    []
  );

  // Determine scene states
  const inCreate = frame >= createStart && frame < createEnd;
  const inEdit = frame >= editStart && frame < editEnd;
  const inOrganize = frame >= organizeStart && frame < organizeEnd;
  const inDelete = frame >= deleteStart && frame < deleteEnd;

  // Simulated selection
  const selectedId =
    inCreate || inEdit || inDelete ? createdNote.id : notesBase[1].id;

  // Compose notes visible in different scenes
  const notes: Note[] = useMemo(() => {
    let list = [...notesBase];
    if (frame >= createStart) {
      // after create begins, show the newly created note at top
      list = [createdNote, ...list];
    }
    if (inOrganize) {
      // Simulate reorder: move personal on top briefly
      const personalIndex = list.findIndex((n) => n.tags.includes('personal'));
      if (personalIndex > -1) {
        const [p] = list.splice(personalIndex, 1);
        list = [p, ...list.filter((n) => n.id !== p.id)];
      }
    }
    if (frame >= deleteStart) {
      // Deleting the new note during delete scene
      list = list.filter((n) => n.id !== createdNote.id);
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame]);

  // Intro zoom-in effect on the app shell
  const introZoom = interpolate(
    frame,
    [0, introEnd],
    [0.98, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Fade controls for scenes
  const fadeInOut = (start: number, end: number) =>
    interpolate(frame, [start, start + 20, end - 20, end], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Editor highlight based on current scene
  const highlight: 'title' | 'content' | 'toolbar' | undefined = inCreate
    ? 'title'
    : inEdit
    ? 'content'
    : inOrganize
    ? 'toolbar'
    : undefined;

  const watermark =
    frame < outroStart ? 'Ocean Notes • Auto‑save enabled' : undefined;

  // Cursor path (absolute viewport positions)
  // Coordinates are tuned to click sidebar new, type in title, edit content, drag tag, delete
  const cursorPath = useMemo(() => {
    const cx = 220; // sidebar center-ish x
    const cyNew = 140; // near "+ New Note"
    const editorLeft = 520;
    const titleY = 220;
    const contentY = 320;
    const toolbarY = 180;
    const deleteButtonX = 1550;
    const deleteButtonY = 180;

    const t0 = createStart + 10;
    const t1 = t0 + 20; // click new
    const t2 = t1 + 30; // move to title
    const t3 = t2 + 30; // click title
    const t4 = editStart + 30; // move to content
    const t5 = t4 + 18; // click content
    const t6 = organizeStart + 40; // move to toolbar
    const t7 = t6 + 20; // click bold
    const t8 = deleteStart + 30; // move to delete button region
    const t9 = t8 + 20; // click delete

    return [
      { x: cx, y: cyNew, t: t0 },
      { x: cx, y: cyNew, t: t1, click: true },
      { x: editorLeft, y: titleY, t: t2 },
      { x: editorLeft + 30, y: titleY, t: t3, click: true },
      { x: editorLeft + 10, y: contentY, t: t4 },
      { x: editorLeft + 10, y: contentY, t: t5, click: true },
      { x: editorLeft + 100, y: toolbarY, t: t6 },
      { x: editorLeft + 100, y: toolbarY, t: t7, click: true },
      { x: deleteButtonX, y: deleteButtonY, t: t8 },
      { x: deleteButtonX, y: deleteButtonY, t: t9, click: true },
    ];
  }, [createStart, editStart, organizeStart, deleteStart]);

  // Scene toasts
  const toastCreateOpacity = fadeInOut(createStart + 40, createStart + 140);
  const toastEditOpacity = fadeInOut(editStart + 40, editStart + 180);
  const toastOrgOpacity = fadeInOut(organizeStart + 50, organizeStart + 200);
  const toastDelOpacity = fadeInOut(deleteStart + 40, deleteStart + 140);

  // App shell header right: subtle callout
  const headerRight = (
    <div
      style={{
        color: OceanTheme.colors.muted,
        fontSize: 12,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <span
        style={{
          padding: '6px 10px',
          borderRadius: 8,
          background: '#fff',
          border: `1px solid ${OceanTheme.colors.border}`,
        }}
      >
        Tags
      </span>
      <span
        style={{
          padding: '6px 10px',
          borderRadius: 8,
          background: '#fff',
          border: `1px solid ${OceanTheme.colors.border}`,
        }}
      >
        Sort
      </span>
      <span
        style={{
          padding: '6px 10px',
          borderRadius: 8,
          background: OceanTheme.colors.secondary,
          color: '#111827',
          fontWeight: 600,
          boxShadow: OceanTheme.shadowSm,
        }}
      >
        Export
      </span>
    </div>
  );

  const titleOpacity = interpolate(frame, [0, 20, 90, 110], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleOpacity = interpolate(frame, [10, 30, 100, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${introZoom})`,
      }}
    >
      {/* Intro title overlay */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 120,
            textAlign: 'center',
            fontWeight: 800,
            fontSize: 72,
            color: OceanTheme.colors.text,
            opacity: titleOpacity,
          }}
        >
          Ocean Notes
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 210,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 24,
            color: OceanTheme.colors.muted,
            opacity: subtitleOpacity,
          }}
        >
          Create • Edit • Organize • Delete
        </div>
      </AbsoluteFill>

      {/* App UI */}
      <AppShell
        theme={OceanTheme}
        headerRight={headerRight}
        sidebar={
          <NotesList
            theme={OceanTheme}
            notes={notes}
            selectedId={selectedId}
            hint="Drag to reorder • Use tags to group"
          />
        }
        content={
          <NoteEditor
            theme={OceanTheme}
            note={
              notes.find((n) => n.id === selectedId) ??
              notes[0] ??
              sampleNotes[0]
            }
            highlight={highlight}
            watermark={watermark}
          />
        }
      />

      {/* Scene toasts */}
      <Sequence from={createStart} durationInFrames={180}>
        <div style={{ opacity: toastCreateOpacity }}>
          <StatusToast theme={OceanTheme} text="New note created" tone="success" />
        </div>
      </Sequence>
      <Sequence from={editStart} durationInFrames={210}>
        <div style={{ opacity: toastEditOpacity }}>
          <StatusToast theme={OceanTheme} text="Edits saved" tone="info" />
        </div>
      </Sequence>
      <Sequence from={organizeStart} durationInFrames={210}>
        <div style={{ opacity: toastOrgOpacity }}>
          <StatusToast theme={OceanTheme} text="Tagged & Reordered" tone="success" />
        </div>
      </Sequence>
      <Sequence from={deleteStart} durationInFrames={180}>
        <div style={{ opacity: toastDelOpacity }}>
          <StatusToast theme={OceanTheme} text="Note deleted" tone="error" />
        </div>
      </Sequence>

      {/* Cursor animation (visible across action scenes) */}
      <AnimatedCursor path={cursorPath} visibleFrom={createStart} visibleTo={deleteEnd} />

      {/* Outro overlay */}
      <Sequence from={outroStart} durationInFrames={outroEnd - outroStart}>
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '22px 28px',
              borderRadius: 16,
              background: '#fff',
              border: `1px solid ${OceanTheme.colors.border}`,
              boxShadow: OceanTheme.shadowLg,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 44,
                marginBottom: 10,
                color: OceanTheme.colors.text,
              }}
            >
              Ocean Notes
            </div>
            <div
              style={{
                fontSize: 18,
                color: OceanTheme.colors.muted,
              }}
            >
              Focused. Organized. Effortless.
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {debug ? (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 12,
            fontSize: 12,
            color: '#111',
            background: 'rgba(255,255,255,0.7)',
            padding: '4px 8px',
            borderRadius: 6,
          }}
        >
          frame {frame} / {durationInFrames}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
