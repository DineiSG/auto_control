import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLojista } from './useLojista';

export default function LojistaLayout() {
  const { carregarLojista } = useLojista();

  useEffect(() => {
    carregarLojista();
  }, [carregarLojista]); // dependência segura

  return <Outlet />;
}