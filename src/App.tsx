import React, { useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useCopyToClipboard } from 'react-use';

const App: React.FC = () => {
    const [clipboardState, copyToClipboard] = useCopyToClipboard();
    const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

    const {
        transcript,
        browserSupportsSpeechRecognition,
        resetTranscript,
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleCopy = () => {
        if (transcript.trim()) {
            copyToClipboard(transcript);
            setCopiedMessage('✅ Copied to clipboard!');
            setTimeout(() => setCopiedMessage(null), 2000);
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <p className="unsupported">Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="container">
            <h2 className="title">🎙️ Speech to Text Converter</h2>
            <p className="subtitle">
                Speak and watch your words appear. You can copy the transcript to clipboard instantly!
            </p>

            <div className="main-content">
                <p className="transcript">{transcript || '🎧 Start speaking...'}</p>
            </div>

            <div className="btn-style">
                <button className="btn copy" onClick={handleCopy}>
                    📋 Copy
                </button>
                <button className="btn start" onClick={startListening}>
                    ▶️ Start Listening
                </button>
                <button className="btn stop" onClick={stopListening}>
                    ⏹️ Stop Listening
                </button>
                <button className="btn clear" onClick={resetTranscript}>
                    🧹 Clear
                </button>
            </div>

            {copiedMessage && <div className="toast">{copiedMessage}</div>}
        </div>
    );
};

export default App;
