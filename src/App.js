import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Katex from 'katex';
import 'katex/dist/katex.min.css';

const App = () => {
  const [streamedContent, setStreamedContent] = useState([]);
  const [currentStream, setCurrentStream] = useState('');

  // Mock stream generator
  useEffect(() => {
    const contentStream = [
      { type: 'text', content: 'Solving the integral:' },
      { type: 'math', content: '\\int_{0}^{\\infty} x^2 e^{-x} dx' },
      { type: 'code', content: 'def integrate(f, a, b):\n    return quad(f, a, b)[0]' },
      { type: 'text', content: 'Using the square root formula:' },
      { type: 'math', content: '\\sqrt{\\frac{a^2 + b^2}{2}}' },
    ];

    let index = 0;
    const streamInterval = setInterval(() => {
      if (index < contentStream.length) {
        setStreamedContent(prev => [...prev, contentStream[index]]);
        index++;
      } else {
        clearInterval(streamInterval);
      }
    }, 1500);

    return () => clearInterval(streamInterval);
  }, []);

  // Real-time text streaming simulation
  useEffect(() => {
    const text = 'Real-time text streaming: 2 + 2 = 4, sqrt(16) = 4... ';
    let index = 0;
    
    const textInterval = setInterval(() => {
      if (index < text.length) {
        setCurrentStream(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(textInterval);
      }
    }, 50);

    return () => clearInterval(textInterval);
  }, []);

  const renderContent = (content) => {
    switch(content.type) {
      case 'code':
        return (
          <SyntaxHighlighter language="python" style={docco}>
            {content.content}
          </SyntaxHighlighter>
        );
      case 'math':
        return (
          <div 
            dangerouslySetInnerHTML={{
              __html: Katex.renderToString(content.content, {
                throwOnError: false
              })
            }}
          />
        );
      default:
        return <p>{content.content}</p>;
    }
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AI Content Rendering Test</h1>
      
      <section style={{ margin: '40px 0' }}>
        <h2>Streamed Content</h2>
        {streamedContent.map((content, index) => (
          <div key={index} style={{ margin: '20px 0' }}>
            {renderContent(content)}
          </div>
        ))}
      </section>

      <section style={{ margin: '40px 0' }}>
        <h2>Real-time Text Stream</h2>
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          minHeight: '60px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace'
        }}>
          {currentStream}
        </div>
      </section>
    </div>
  );
};

export default App;