import { useState } from 'react'
import Chat from '../components/Chat';

const ChatScreen = () => {
  const [mode, setMode] = useState<'group' | 'personal'>('group');
  const [targetId, setTargetId] = useState<string>('');

  return (
    <div className="app">
      <h1>Real-Time Chat App</h1>
      <select onChange={(e) => setMode(e.target.value as 'group' | 'personal')}>
        <option value="group">Group Chat</option>
        <option value="personal">Personal Chat</option>
      </select>
      <input
        placeholder={mode === 'group' ? 'Enter Group ID' : 'Enter User ID'}
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
      />
      <Chat mode={mode} targetId={targetId} />
    </div>
  );
}

export default ChatScreen