import { useContext } from 'react';
import { LojistaContext } from './LojistaContext';

//Hook em arquivo .js — não é componente, não interfere no Fast Refresh
export const useLojista = () => {
  const context = useContext(LojistaContext);
  if (context === undefined) {
    throw new Error('useLojista deve ser usado dentro de um LojistaProvider');
  }
  return context;
};