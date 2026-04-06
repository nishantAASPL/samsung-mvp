import { useState } from 'react';

export function useModelToggle(initial = 'TO_BE', onToggle) {
  const [model, setModel] = useState(initial);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModelToggle = (newModel) => {
    if (newModel === model) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setModel(newModel);
      setIsTransitioning(false);
      onToggle?.(newModel);
    }, 400);
  };

  return { model, isTransitioning, handleModelToggle };
}
