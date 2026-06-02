import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Check, AlertCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadZone = ({
  onFileSelect,
  accept = '.pdf,.docx',
  maxSizeMB = 10,
  loading = false,
  progress = 0,
}) => {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateFile = (file) => {
    setError(null);
    if (!file) return false;

    // Validate size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }

    // Validate type (basic extension check)
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const acceptedExtensions = accept.split(',').map((x) => x.trim().toLowerCase());
    if (!acceptedExtensions.includes(ext)) {
      setError(`Invalid file type. Accepted formats: ${accept}`);
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={selectedFile || loading ? undefined : triggerFileInput}
        className={`
          relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl md:rounded-3xl p-8 md:p-12 text-center transition-all cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-slate-50/10'}
          ${selectedFile ? 'cursor-default border-slate-200 bg-white shadow-premium' : ''}
        `}
      >
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4 shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800 tracking-tight font-display mb-1.5">
                Drag and drop your resume
              </h4>
              <p className="text-sm text-slate-400 mb-6">
                Support PDF, DOCX formats (Max {maxSizeMB}MB)
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-sm font-semibold text-slate-600 transition-colors shadow-sm font-display"
              >
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 w-full max-w-md shadow-sm mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-slate-700 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-slate-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                {!loading && (
                  <button
                    onClick={removeFile}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {loading && (
                <div className="w-full max-w-md flex flex-col items-center gap-2">
                  <div className="flex justify-between w-full text-xs font-semibold text-slate-500 uppercase tracking-wider font-display">
                    <span>Parsing Resume...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-blue-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              )}

              {!loading && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold uppercase tracking-wider font-display mt-2">
                  <Check className="w-4 h-4" /> Ready to Screening
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-rose-500 font-semibold uppercase tracking-wider font-display">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
