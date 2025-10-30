import { Composition } from "remotion";
import { NotesDemo } from "./NotesDemo";

/**
 * PUBLIC_INTERFACE
 * RemotionRoot
 * Exposes the single entry composition "NotesDemo" with 1080p/30fps defaults.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NotesDemo"
        component={NotesDemo}
        durationInFrames={1350} // ~45 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
