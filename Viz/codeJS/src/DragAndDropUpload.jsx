import React, { useCallback, useRef, useState } from "react";

export default function DragAndDropUpload({
                                              accept = ["text/csv"], // allowed MIME types
                                              maxSizeMB = 500,                                           // per-file size limit
                                              multiple = true,
                                              onUpload,  // optional: async function(files) to upload
                                          }) {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState([]);
    const inputRef = useRef(null);

    const maxSize = maxSizeMB * 1024 * 1024;

    const validate = useCallback((items) => {
        const ok = [];
        const errs = [];
        for (const f of items) {
            if (accept.length && !accept.includes(f.type)) {
                errs.push(`${f.name}: type "${f.type || "unknown"}" not allowed`);
                continue;
            }
            if (f.size > maxSize) {
                errs.push(`${f.name}: larger than ${maxSizeMB} MB`);
                continue;
            }
            ok.push(f);
        }
        return { ok, errs };
    }, [accept, maxSize, maxSizeMB]);

    const handleFiles = useCallback((fileList) => {
        const arr = Array.from(fileList);
        const { ok, errs } = validate(arr);
        setErrors(errs);
        setFiles((prev) => (multiple ? [...prev, ...ok] : ok.slice(0, 1)));
    }, [multiple, validate]);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) {
            handleFiles(e.dataTransfer.files);
        }
    }, [handleFiles]);

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // only cancel when leaving the drop zone, not entering children
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsDragging(false);
    };

    const onPick = () => inputRef.current?.click();

    const removeFile = (name) =>
        setFiles((prev) => prev.filter((f) => f.name !== name));

    const upload = async () => {
        if (!onUpload) {
            alert("Provide an onUpload(files) prop to perform uploads.");
            return;
        }
        try {
            await onUpload(files);
            setFiles([]);
            setErrors([]);
        } catch (err) {
            setErrors([String(err)]);
        }
    };

    return (
        <div className="uploader">
            <div
                className={`dropzone ${isDragging ? "dragging" : ""}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick()}
                aria-label="Upload files by dragging and dropping or press Enter to choose files"
            >
                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: "none" }}
                    multiple={multiple}
                    accept={accept.join(",")}
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <div className="dropzone-inner" onClick={onPick}>
                    <strong>Drag & drop</strong> files here, or <u>click to browse</u>
                    <div className="hint">
                        Allowed: {accept.join(", ")} · Max {maxSizeMB} MB each
                    </div>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="errors" role="alert">
                    {errors.map((e, i) => (
                        <div key={i}>• {e}</div>
                    ))}
                </div>
            )}

            {files.length > 0 && (
                <>
                    <ul className="filelist">
                        {files.map((f) => (
                            <li key={f.name}>
                                <div className="meta">
                                    <span className="name">{f.name}</span>
                                    <span className="size">
                    {(f.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                                </div>
                                {f.type.startsWith("image/") && (
                                    <img
                                        className="preview"
                                        src={URL.createObjectURL(f)}
                                        alt={f.name}
                                        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                                    />
                                )}
                                <button className="remove" onClick={() => removeFile(f.name)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className="upload" onClick={upload} disabled={!onUpload}>
                        Upload {files.length} file{files.length > 1 ? "s" : ""}
                    </button>
                </>
            )}

            {/* Minimal styles for clarity */}
            <style>{`
        .uploader { font-family: system-ui, sans-serif; max-width: 720px; margin: 24px auto; }
        .dropzone { border: 2px dashed #bbb; border-radius: 12px; padding: 28px; cursor: pointer; transition: border-color .15s, background .15s; }
        .dropzone.dragging { border-color: #555; background: #f8f8f8; }
        .dropzone-inner { text-align: center; line-height: 1.4; }
        .hint { color: #666; font-size: 12px; margin-top: 6px; }
        .errors { margin-top: 12px; color: #a40000; background: #fff1f1; border: 1px solid #f0b3b3; padding: 8px 10px; border-radius: 8px; }
        .filelist { list-style: none; padding: 0; margin: 16px 0; display: grid; gap: 12px; }
        .filelist li { border: 1px solid #e6e6e6; border-radius: 12px; padding: 10px; display: grid; gap: 8px; }
        .meta { display: flex; justify-content: space-between; gap: 10px; }
        .name { font-weight: 600; }
        .preview { max-height: 120px; max-width: 100%; border-radius: 8px; }
        .remove, .upload { padding: 8px 12px; border-radius: 10px; border: 1px solid #ddd; background: #fafafa; cursor: pointer; }
        .remove:hover, .upload:hover { background: #f0f0f0; }
      `}</style>
        </div>
    );
}
