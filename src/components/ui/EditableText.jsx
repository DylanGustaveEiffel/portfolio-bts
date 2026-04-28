import React, { useState, useRef } from 'react';

export default function EditableText({ initialValue, placeholder, tagName: Tag = 'span' }) {
  const [content, setContent] = useState(initialValue);
  const textRef = useRef(null);

  const handleBlur = () => {
    if (textRef.current) {
      setContent(textRef.current.innerText);
      // Ici tu pourrais ajouter une logique pour sauvegarder spécifiquement cet élément dans le localStorage si besoin
    }
  };

  return (
    <Tag
      ref={textRef}
      contentEditable
      suppressContentEditableWarning={true}
      data-placeholder={placeholder}
      onBlur={handleBlur}
      style={{ outline: 'none' }}
    >
      {content}
    </Tag>
  );
}