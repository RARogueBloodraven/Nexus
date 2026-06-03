import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Share2 } from 'lucide-react';

import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import { DocumentChamber } from './documentchamber'; // adjust path if needed

const documents = [
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    shared: true
  },
  {
    id: 2,
    name: 'Financial Projections.xlsx',
    type: 'Spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-02-10',
    shared: true
  },
  {
    id: 3,
    name: 'Business Plan.docx',
    type: 'Document',
    size: '3.2 MB',
    lastModified: '2024-02-05',
    shared: true
  },
  {
    id: 4,
    name: 'Market Research.pdf',
    type: 'PDF',
    size: '5.1 MB',
    lastModified: '2024-01-28',
    shared: true
  }
];

export const DocumentsPage: React.FC = () => {
  const [openChamber, setOpenChamber] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <Button
          leftIcon={<Upload size={18} />}
          onClick={() => setOpenChamber(true)}
        >
          Upload Document
        </Button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* STORAGE */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>

          <CardBody className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Used</span>
              <span className="font-medium">12.5 GB</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }} />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available</span>
              <span className="font-medium">7.5 GB</span>
            </div>
          </CardBody>
        </Card>

        {/* DOCUMENT LIST */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium">All Documents</h2>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">Sort</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <FileText className="text-blue-600 mr-3" />

                    <div className="flex-1">
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {doc.size} • {doc.lastModified}
                      </p>
                    </div>

                    {doc.shared && (
                      <Badge variant="secondary" size="sm">
                        Shared
                      </Badge>
                    )}

                    <div className="flex gap-2 ml-4">
                      <Download size={18} />
                      <Share2 size={18} />
                      <Trash2 size={18} className="text-red-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* DOCUMENT CHAMBER MODAL */}
      {openChamber && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] h-[90%] rounded-xl p-4 relative overflow-auto">

            {/* CLOSE */}
            <button
              onClick={() => setOpenChamber(false)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <DocumentChamber />
          </div>

        </div>
      )}

    </div>
  );
};