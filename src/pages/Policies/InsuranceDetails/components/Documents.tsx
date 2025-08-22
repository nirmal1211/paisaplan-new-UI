import React from "react";
import { Upload, ArrowUpCircle, FileText, Eye, Download } from "lucide-react";
import { Policy } from "../types";

interface DocumentsProps {
  policy: Policy;
  selectedFiles: File[];
  editFileIndex: number | null;
  editFileName: string;
  onSelectedFilesChange: (files: File[]) => void;
  onEditFileIndexChange: (index: number | null) => void;
  onEditFileNameChange: (name: string) => void;
}

const Documents: React.FC<DocumentsProps> = ({
  policy,
  selectedFiles,
  editFileIndex,
  editFileName,
  onSelectedFilesChange,
  onEditFileIndexChange,
  onEditFileNameChange,
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onSelectedFilesChange([...selectedFiles, ...files]);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      // TODO: Implement upload logic here
      alert(`Uploading: ${selectedFiles.map((f) => f.name).join(", ")}`);
      onSelectedFilesChange([]);
    }
  };

  const handleFileRename = (index: number) => {
    if (editFileName.trim()) {
      // Rename logic (temporary, only UI)
      const renamed = new File([selectedFiles[index]], editFileName, {
        type: selectedFiles[index].type,
      });
      const newFiles = selectedFiles.map((f, i) => (i === index ? renamed : f));
      onSelectedFilesChange(newFiles);
    }
    onEditFileIndexChange(null);
    onEditFileNameChange("");
  };

  const handleFileDelete = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onSelectedFilesChange(newFiles);
  };

  const defaultDocuments = [
    ["Policy Document", "/documents/policy.pdf"],
    ["Certificate", "/documents/certificate.pdf"],
    ["Terms & Conditions", "/documents/terms.pdf"],
  ];

  const documents = policy.documents
    ? Object.entries(policy.documents)
    : defaultDocuments;

  return (
    <div
      className="rounded-xl shadow-lg p-6"
      style={{ backgroundColor: "var(--color-card)" }}
    >
      {/* Upload Document Option */}
      <div className="mb-2 w-full">
        {/* <div
          className="w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-secondary)",
          }}
        >
          <Upload
            className="h-10 w-10 mb-2 text-primary"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="font-semibold font-poppins text-base mb-1">
            Upload New Document
          </span>
          <span
            className="text-xs font-roboto mb-2"
            style={{ color: "var(--color-muted)" }}
          >
            PDF, JPG, PNG up to 10MB
          </span>
          <input
            id="upload-document"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <div className="flex gap-2 mt-2">
            <label
              htmlFor="upload-document"
              className="px-4 py-2 rounded text-white text-sm font-roboto cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Upload
                className="h-4 w-4"
                style={{ color: "var(--color-background)" }}
              />
              Choose Files
            </label>
            <button
              className="px-4 py-2 rounded text-white text-sm font-roboto hover:opacity-90 transition-all flex items-center gap-2"
              style={{ backgroundColor: "var(--color-success)" }}
              disabled={selectedFiles.length === 0}
              onClick={handleUpload}
            >
              <ArrowUpCircle
                className="h-4 w-4"
                style={{ color: "var(--color-background)" }}
              />
              Upload
            </button>
          </div>

         
          {selectedFiles.length > 0 && (
            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded px-3 py-2 shadow border"
                  style={{
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    {editFileIndex === idx ? (
                      <input
                        type="text"
                        value={editFileName}
                        onChange={(e) => onEditFileNameChange(e.target.value)}
                        className="border rounded px-2 py-1 text-sm font-roboto flex-1 mr-2"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-card)",
                          color: "var(--color-foreground)",
                        }}
                        onBlur={() => handleFileRename(idx)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleFileRename(idx);
                          }
                        }}
                      />
                    ) : (
                      <span
                        className="text-sm font-roboto cursor-pointer"
                        style={{ color: "var(--color-primary)" }}
                        onClick={() => {
                          onEditFileIndexChange(idx);
                          onEditFileNameChange(file.name);
                        }}
                      >
                        {file.name}
                      </span>
                    )}
                    <div className="flex gap-2">
                      <button
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-background)",
                        }}
                        onClick={() => {
                          onEditFileIndexChange(idx);
                          onEditFileNameChange(file.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-danger)",
                          color: "var(--color-background)",
                        }}
                        onClick={() => handleFileDelete(idx)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {file.type} • {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>

      {/* Existing Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(([name], index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FileText
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <div className="flex-1">
                <h4
                  className="font-semibold font-poppins text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {name}
                </h4>
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  PDF • 2.5 MB
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View
              </button>
              <button
                className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
