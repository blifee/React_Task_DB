import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Eye } from 'lucide-react';

export default function MultiDocumentUpload() {
  const [documentTitle, setDocumentTitle] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection from browse button
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  // Handle drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  // Add files to the uploaded list
  const addFiles = (files) => {
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadDate: new Date().toLocaleString()
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  // Remove a file from the list
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  // Preview file
  const handlePreview = (file) => {
    // For images, create object URL
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file.file);
      setPreviewFile({ ...file, url });
    } else if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file.file);
      setPreviewFile({ ...file, url });
    } else {
      alert(`Preview not available for ${file.type}`);
    }
  };

  // Close preview
  const closePreview = () => {
    if (previewFile?.url) {
      URL.revokeObjectURL(previewFile.url);
    }
    setPreviewFile(null);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one document');
      return;
    }

    alert(`Submitting ${uploadedFiles.length} document(s) with title: "${documentTitle || 'Untitled'}"`);
    console.log('Files to submit:', uploadedFiles);
    
    // Reset form
    setDocumentTitle('');
    setUploadedFiles([]);
  };

  // Cancel and reset
  const handleCancel = () => {
    setDocumentTitle('');
    setUploadedFiles([]);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-6">4. Multi-Document Upload in Forms</h2>
        
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
            <li>Extend an existing form to support <strong>uploading multiple documents at once</strong>.</li>
            <li>Show an <strong>inline list</strong> of uploaded files with:
              <ul className="list-circle list-inside ml-6">
                <li>File name</li>
                <li>Preview (if applicable)</li>
                <li>Option to remove a file before final submission</li>
              </ul>
            </li>
            <li>Support both <strong>drag-and-drop</strong> and <strong>file select button</strong>.</li>
            <li>Use Tailwind for styling (drag area, file list, buttons).</li>
          </ul>
        </div> */}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add Documents</h3>
          
          {/* Document Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="TEST DOCUMENT TWO"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Upload Area */}
          <div className="mb-4">
            <div className="flex gap-2 items-center">
              {/* Browse Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-md transition-colors"
              >
                Browse
              </button>

              <span className="text-gray-500 text-sm font-medium">OR</span>

              {/* Drag and Drop Area */}
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 border-2 border-dashed rounded-md py-3 text-center cursor-pointer transition-colors ${
                  isDragging 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-teal-400'
                }`}
              >
                <p className="text-sm text-gray-500">Drag and Drop file here</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md font-medium transition-colors"
            >
              Add Document
            </button>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Uploaded Files:</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText size={20} className="text-gray-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)} • {file.uploadDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Preview Button (only for images and PDFs) */}
                      {(file.type.startsWith('image/') || file.type === 'application/pdf') && (
                        <button
                          onClick={() => handlePreview(file)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Preview"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* File Count Summary */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>{uploadedFiles.length}</strong> file{uploadedFiles.length !== 1 ? 's' : ''} ready to upload
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">{previewFile.name}</h3>
              <button
                onClick={closePreview}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {previewFile.type.startsWith('image/') ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  className="max-w-full h-auto mx-auto"
                />
              ) : previewFile.type === 'application/pdf' ? (
                <iframe
                  src={previewFile.url}
                  className="w-full h-[600px] border-0"
                  title={previewFile.name}
                />
              ) : (
                <p className="text-center text-gray-500">Preview not available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}