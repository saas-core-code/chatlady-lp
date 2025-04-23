'use client';

import { createContext, useContext } from 'react';

interface AnimationContextType {
  isReady: boolean;
}

const AnimationContext = createContext<AnimationContextType>({ isReady: true });

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnimationContext.Provider value={{ isReady: true }}>
      {children}
    </AnimationContext.Provider>
  );
}