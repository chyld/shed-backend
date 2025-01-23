"use client";

import { useState, useEffect, useCallback } from "react";
import { use } from "react";

interface Media {
  id: string;
  shedId: string;
  path: string;
  isPhoto: boolean;
  isPrimary: boolean;
  isDeleted: boolean;
}

export default function ShedMediaPage({ params }: { params: Promise<{ shedId: string }> }) {
  const resolvedParams = use(params);
  const [files, setFiles] = useState<FileList | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = useCallback(async () => {
    const response = await fetch(`/api/sheds/${resolvedParams.shedId}/media`);
    const data = await response.json();
    setMedia(data);
  }, [resolvedParams.shedId]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(`/api/sheds/${resolvedParams.shedId}/media`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      await fetchMedia();
      setFiles(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleMediaClick = async (mediaId: string) => {
    const mediaItem = media.find((m) => m.id === mediaId);
    if (!mediaItem) return;

    // If media is deleted, handle undelete via the delete endpoint
    if (mediaItem.isDeleted) {
      const response = await fetch(`/api/sheds/${resolvedParams.shedId}/media/${mediaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await fetchMedia();
      }
      return;
    }

    // Handle setting primary (only for non-deleted media)
    try {
      const response = await fetch(`/api/sheds/${resolvedParams.shedId}/media`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mediaId }),
      });

      if (!response.ok) throw new Error("Update failed");
      await fetchMedia();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (mediaId: string) => {
    const response = await fetch(`/api/sheds/${resolvedParams.shedId}/media/${mediaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Refresh the media list instead of filtering
      await fetchMedia();
    } else {
      alert("Error deleting media");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Shed Media Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input type="file" multiple accept="image/*,video/*" onChange={(e) => setFiles(e.target.files)} style={{ marginBottom: "10px", display: "block" }} />
        <button
          type="submit"
          disabled={!files || uploading}
          style={{
            padding: "8px 16px",
            backgroundColor: uploading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {media.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMediaClick(item.id)}
            style={{
              border: item.isDeleted ? "3px solid #ff0000" : item.isPrimary ? "2px solid #007bff" : "1px solid #ddd",
              padding: "10px",
              cursor: "pointer",
              position: "relative",
              opacity: item.isDeleted ? 0.7 : 1,
            }}
          >
            {item.isPrimary && !item.isDeleted && (
              <div
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  background: "#007bff",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.8em",
                }}
              >
                Primary
              </div>
            )}
            {item.isDeleted && (
              <div
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  background: "#ff0000",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.8em",
                }}
              >
                Deleted
              </div>
            )}
            {!item.isDeleted && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="delete-button"
              >
                Delete
              </button>
            )}
            {item.isPhoto ? <img src={item.path} alt="Shed media" style={{ width: "100%", height: "auto" }} /> : <video controls src={item.path} style={{ width: "100%", height: "auto" }} />}
          </div>
        ))}
      </div>

      <style jsx>{`
        .delete-button {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 10;
          background-color: red;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-button:hover {
          background-color: darkred;
        }
        img,
        video {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
