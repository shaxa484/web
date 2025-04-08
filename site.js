import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState([]);
  const correctPassword = '1qw'; // Change this to your desired password

  useEffect(() => {
    // Load previously uploaded files from localStorage
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setFiles(savedFiles);
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toLocaleString(),
      };
      
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      
      // Save to localStorage
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <form onSubmit={handlePasswordSubmit}>
          <h2>Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>File Upload System</h1>
      
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>

      <div className="files-list">
        <h2>Uploaded Files</h2>
        {files.length === 0 ? (
          <p>No files uploaded yet</p>
        ) : (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <strong>{file.name}</strong>
                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                <p>Type: {file.type}</p>
                <p>Uploaded: {file.uploadDate}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

/* Add this CSS to your App.css file */
