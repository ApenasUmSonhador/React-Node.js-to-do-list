import { IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import type Task from '../types/task';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  onToggleDone: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

export default function TaskItem({ task, onToggleDone, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      alert('O título não pode ficar vazio.');
      return;
    }

    onUpdate({ ...task, title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <ListItem
      secondaryAction={
        <>
          {isEditing ? (
            <IconButton edge="end" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
          {!isEditing && (
            <IconButton edge="end" onClick={() => onToggleDone(task)}>
              <CheckIcon />
            </IconButton>
          )}
          <IconButton edge="end" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      {isEditing ? (
        <div style={{ width: '96%' }}>
          <TextField
            fullWidth
            label="Título"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            margin="dense"
            multiline
          />
          <TextField
            fullWidth
            label="Descrição"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            margin="dense"
            multiline
          />
        </div>
      ) : (
        <div style={{ width: '90%' }}>

          <ListItemText
            primary={task.title}
            secondary={
              <>
                {task.description && <span style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{task.description}</span>}
                <br />
                <small>Criado em: {new Date(task.createdAt).toLocaleDateString()}</small>
              </>
            }
            sx={{
              textDecoration: task.done ? 'line-through' : 'none',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          />
        </div>
      )}
    </ListItem>
  );
}
