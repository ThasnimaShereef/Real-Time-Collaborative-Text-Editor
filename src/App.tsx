import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

const userColors = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

function getRandomColor() {
  return userColors[Math.floor(Math.random() * userColors.length)];
}

function App() {
  const [username, setUsername] = useState('');
  const [color, setColor] = useState('');
  const [inputName, setInputName] = useState('');
  const [users, setUsers] = useState<{ name: string; color: string }[]>([]);
  const [editor, setEditor] = useState<Editor | null>(null);

  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);

  useEffect(() => {
    if (username && color) {
      const ydoc = new Y.Doc();
      ydocRef.current = ydoc;

      const provider = new WebrtcProvider('tiptap-room', ydoc, {
        signaling: [
          'wss://signaling.yjs.dev',
          'wss://y-webrtc-signaling-eu.herokuapp.com',
          'wss://y-webrtc-signaling-us.herokuapp.com',
        ],
      });
      providerRef.current = provider;

      provider.awareness.setLocalStateField('user', { name: username, color });

      const newEditor = new Editor({
        extensions: [
          StarterKit.configure({ history: false }),
          Collaboration.configure({ document: ydoc }),
          CollaborationCursor.configure({
            provider,
            user: { name: username, color },
          }),
        ],
        content: '',
      });

      setEditor(newEditor);

      const awarenessChangeHandler = () => {
        const states = Array.from(provider.awareness.getStates().values());
        const activeUsers = states
          .map((state: any) => state.user)
          .filter((u: any) => u?.name && u?.color);
        setUsers(activeUsers);
      };

      provider.awareness.on('change', awarenessChangeHandler);
      awarenessChangeHandler();

      return () => {
        newEditor.destroy();
        provider.destroy();
        ydoc.destroy();
      };
    }
  }, [username, color]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUsername(inputName.trim());
      setColor(getRandomColor());
    }
  };

  if (!username) {
    return (
      <div className="username-form-container">
        <form onSubmit={handleSubmit} className="username-form">
          <label htmlFor="username">Enter your username:</label>
          <input
            id="username"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="username-input"
            autoFocus
          />
          <button type="submit" className="username-button">
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="sidebar">
        <h3>Online Users</h3>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-list-item">
              <span className="user-color-dot" style={{ backgroundColor: user.color }} />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="editor-main">
        <h2 className="editor-header">Real-Time Collaborative Text Editor</h2>
        <p className="editor-user">
          User: <span className="user-color" style={{ color }}>{username}</span>
        </p>
        {editor ? (
          <EditorContent editor={editor} className="editor-area" />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>
    </div>
  );
}

export default App;


