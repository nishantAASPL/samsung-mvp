import { useState } from 'react';

export function useToast(duration = 3000) {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  return { toastMessage, showToast };
}
