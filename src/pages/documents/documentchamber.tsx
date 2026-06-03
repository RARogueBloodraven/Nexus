import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

interface DocumentItem {
  id: string;
  name: string;
  file?: File;
  status: DocStatus;
  signed?: boolean;
}

export const DocumentChamber: React.FC = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const sigRef = useRef<SignatureCanvas | null>(null);

  // UPLOAD FILE
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc: DocumentItem = {
      id: crypto.randomUUID(),
      name: file.name,
      file,
      status: 'Draft',
      signed: false,
    };

    setDocs(prev => [...prev, newDoc]);
  };

  // SET STATUS
  const updateStatus = (id: string, status: DocStatus) => {
    setDocs(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status } : d
      )
    );
  };

  // CLEAR SIGNATURE
  const clearSignature = () => {
    sigRef.current?.clear();
  };

  // SAVE SIGNATURE
  const saveSignature = () => {
    if (!selectedDoc) return;

    setDocs(prev =>
      prev.map(d =>
        d.id === selectedDoc.id
          ? { ...d, status: 'Signed', signed: true }
          : d
      )
    );

    alert('Document Signed (Mock)');
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Document Chamber
      </h1>

      {/* UPLOAD SECTION */}
      <div className="p-4 border rounded bg-white">
        <input type="file" onChange={handleUpload} />
      </div>

      {/* DOCUMENT LIST */}
      <div className="grid grid-cols-3 gap-4">

        {docs.map(doc => (
          <div
            key={doc.id}
            className="p-4 border rounded bg-gray-50 space-y-2"
          >

            <h3 className="font-semibold">{doc.name}</h3>

            {/* STATUS BADGE */}
            <p
              className={`text-sm font-medium ${
                doc.status === 'Signed'
                  ? 'text-green-600'
                  : doc.status === 'In Review'
                  ? 'text-yellow-600'
                  : 'text-gray-600'
              }`}
            >
              {doc.status}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
              >
                Open
              </button>

              <button
                onClick={() => updateStatus(doc.id, 'In Review')}
                className="px-2 py-1 bg-yellow-500 text-white text-sm rounded"
              >
                Review
              </button>

              <button
                onClick={() => updateStatus(doc.id, 'Signed')}
                className="px-2 py-1 bg-green-500 text-white text-sm rounded"
              >
                Mark Signed
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* DOCUMENT PREVIEW + SIGNATURE */}
      {selectedDoc && (
        <div className="p-6 border rounded bg-white space-y-4">

          <h2 className="text-xl font-semibold">
            {selectedDoc.name}
          </h2>

          <p className="text-sm text-gray-500">
            Status: {selectedDoc.status}
          </p>

          {/* FAKE PDF PREVIEW */}
          <div className="h-64 border bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">
              PDF Preview (Mock)
            </p>
          </div>

          {/* SIGNATURE PAD */}
          <div className="space-y-2">
            <h3 className="font-medium">E-Signature</h3>

            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              canvasProps={{
                className: 'border w-full h-40 bg-white'
              }}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">

            <button
              onClick={clearSignature}
              className="px-3 py-2 bg-gray-500 text-white rounded"
            >
              Clear
            </button>

            <button
              onClick={saveSignature}
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              Sign Document
            </button>

          </div>

        </div>
      )}
    </div>
  );
};