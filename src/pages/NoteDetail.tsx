import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchNoteById, type Route } from "@/lib/api";

function NoteDetail() {
  const location = useLocation();
  const noteId = (location.state as { id: string })?.id;
  const [note, setNote] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId) return;
      setLoading(true);
      const fetchedNote = await fetchNoteById(noteId);
      setNote(fetchedNote);
      setLoading(false);
    };

    loadNote();
  }, [noteId]);

  if (loading) {
    return (
      <div className="w-full p-10">
        <div className="max-w-6xl">
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="w-full p-10">
        <div className="max-w-6xl">
          <p className="text-foreground">Note not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-10">
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {note.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {note.description}
        </p>
        <div className="flex gap-2 mb-8 flex-wrap">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-muted-foreground mb-8 space-y-1">
          <p>Created: {new Date(note.created_at).toLocaleDateString()}</p>
          <p>Updated: {new Date(note.updated_at).toLocaleDateString()}</p>
          <p>Locked: {note.locked ? "Yes" : "No"}</p>
          <p>Visible: {note.visible ? "Yes" : "No"}</p>
        </div>
        {(note as any).content && (
          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Content</h2>
            <p className="text-foreground">{(note as any).content}</p>
          </div>
        )}
        {(note as any).terms && Object.keys((note as any).terms).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Terms</h2>
            <div className="space-y-2">
              {Object.entries((note as any).terms).map(([term, definition]) => (
                <div key={term} className="bg-secondary p-4 rounded">
                  <h3 className="font-bold text-foreground">{term}</h3>
                  <p className="text-muted-foreground">{String(definition)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteDetail;
