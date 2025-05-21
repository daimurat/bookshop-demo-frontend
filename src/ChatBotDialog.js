import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

export default function ChatBotDialog({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost/bff/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "query": userMessage.text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.answer || 'No response.' },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'エラーが発生しました。' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>チャットボット</DialogTitle>
      <DialogContent dividers style={{ minHeight: 300 }}>
        <List>
          {messages.map((msg, idx) => (
            <ListItem key={idx} alignItems={msg.sender === 'user' ? 'right' : 'left'}>
              <ListItemText
                primary={msg.text}
                secondary={msg.sender === 'user' ? 'あなた' : 'ボット'}
                style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}
              />
            </ListItem>
          ))}
          {loading && (
            <ListItem>
              <CircularProgress size={20} />
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="質問を入力..."
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          disabled={loading}
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()} variant="contained">送信</Button>
        <Button onClick={onClose} color="secondary">閉じる</Button>
      </DialogActions>
    </Dialog>
  );
}
