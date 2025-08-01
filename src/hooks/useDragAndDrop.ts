
import { useState } from 'react';

export interface DragItem {
  id: string;
  index: number;
}

export const useDragAndDrop = <T>(items: T[], onReorder: (newItems: T[]) => void) => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem({ id: `item-${index}`, index });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const sourceIndex = draggedItem.index;
    if (sourceIndex === targetIndex) return;

    const newItems = [...items];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    onReorder(newItems);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return {
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};
