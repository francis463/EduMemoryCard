import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { User } from 'lucide-react';

interface NameInputDialogProps {
  open: boolean;
  onSubmit: (name: string) => void;
  onCancel?: () => void;
}

export function NameInputDialog({ open, onSubmit, onCancel }: NameInputDialogProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (trimmedName) {
      onSubmit(trimmedName);
      setName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel?.()}>
      <DialogContent 
        className="bg-[#0b1626] border-white/[0.1] text-[#e6eef8]"
      >
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#7dd3fc] to-[#60a5fa] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl sm:text-2xl">Welcome to EduMemory!</DialogTitle>
          <DialogDescription className="text-center text-[#94a3b8]">
            Enter your name to start playing and compete on the leaderboard
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white/[0.05] border-white/[0.1] text-[#e6eef8] placeholder:text-[#94a3b8] focus:border-[#7dd3fc]"
            maxLength={20}
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-[#7dd3fc] to-[#60a5fa] hover:from-[#60a5fa] hover:to-[#7dd3fc] text-[#07122a]"
          >
            Start Playing
          </Button>
          {onCancel && (
            <Button
              onClick={onCancel}
              className="w-full bg-gradient-to-r from-[#7dd3fc] to-[#60a5fa] hover:from-[#60a5fa] hover:to-[#7dd3fc] text-[#07122a]"
            >
              Cancel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}