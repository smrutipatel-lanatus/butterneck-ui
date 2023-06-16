import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';

export const RichTextbox = ({ sx, toolbarStyles, editorStyles, textBoxProps, onChange = () => null }) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onChange(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef, onChange]);

  return (
    <Box sx={{ ...sx, '& .ql-toolbar': toolbarStyles, '& .ql-editor': editorStyles }} {...textBoxProps}>
      <Box ref={quillRef} />
    </Box>
  );
};
