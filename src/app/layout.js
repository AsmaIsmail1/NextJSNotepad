'use client';

import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './globals.css';


export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const notesRef = useRef();

  const handleSaveNote = () => {
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = currentNote;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, currentNote]);
    }
    setCurrentNote('');
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const applyFormat = (tag) => {
    const selectedText = window.getSelection().toString();
    if (!selectedText) return;

    const formattedText = currentNote.replace(
      selectedText,
      `<${tag}>${selectedText}</${tag}>`
    );

    setCurrentNote(formattedText);
  };

  const exportToPDF = () => {
    const element = notesRef.current;
    html2pdf().from(element).save('notes.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">📝 Notes App</h1>

      <div className="mb-4">
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded mb-2"
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Write your note here..."
        ></textarea>

        <div className="flex space-x-2 mb-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => applyFormat('b')}
          >
            Bold
          </button>
          <button
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => applyFormat('i')}
          >
            Italic
          </button>
          <button
            className="px-3 py-1 bg-purple-500 text-white rounded"
            onClick={() => applyFormat('u')}
          >
            Underline
          </button>
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={handleSaveNote}
        >
          {editingIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your Notes</h2>
      <div className="space-y-4" ref={notesRef}>
        {notes.map((note, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded shadow flex justify-between items-start"
          >
            <div
              className="flex-1 prose"
              dangerouslySetInnerHTML={{ __html: note }}
            ></div>
            <div className="flex flex-col space-y-2 ml-4">
              <button
                className="px-2 py-1 bg-yellow-400 text-white rounded"
                onClick={() => handleEditNote(index)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDeleteNote(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {notes.length > 0 && (
        <div className="mt-6">
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Export Notes to PDF
          </button>
        </div>
      )}
    </div>
  );
}
