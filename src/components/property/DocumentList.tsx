type Document = {
  id: string;
  name: string;
  type: string;
  url: string;
};

type DocumentListProps = {
  documents: Document[];
};

const DocumentList = ({ documents }: DocumentListProps) => {
  if (!documents.length) {
    return (
      <p className="text-muted small">
        No documents available.
      </p>
    );
  }

  return (
    <div className="list-group">
      {documents.map((doc, index) => (
        <div
          key={doc.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${index === documents.length - 1 ? "mb-4" : ""}`}
        >
          <div>
            <div className="fw-medium">{doc.name}</div>
            <small className="text-muted">{doc.type}</small>
          </div>

          <a
            href={doc.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-outline-primary"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;