import React, { useState } from 'react';
import useCookiesSession from '../services/useCookiesSession';

/**
 * Componente de teste para simular o fluxo completo de autenticação
 * usando cookies mockados
 */
const TestAuthComponent = () => {
  const {
    sessionData,
    loading,
    error,
    sendCookiesToApi,
    initializeSession,
    getSessionInfo,
    clearSession,
    getCookiesFromBrowser,
  } = useCookiesSession();

  const [logs, setLogs] = useState([]);

  // Adiciona log na interface
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  // Cria cookies mockados no navegador
  const createMockCookies = () => {
    document.cookie = "PHPSESSID=abc123def456; path=/; max-age=3600";
    document.cookie = "user_session=mock_session_token_789; path=/; max-age=3600";
    addLog('✅ Cookies mockados criados no navegador', 'success');
  };

  // Testa o fluxo completo
  const handleTestFullFlow = async () => {
    try {
      setLogs([]);
      addLog('🚀 Iniciando teste do fluxo completo...', 'info');

      // Passo 1: Criar cookies
      createMockCookies();
      await new Promise(resolve => setTimeout(resolve, 500));

      // Passo 2: Capturar cookies
      const cookies = getCookiesFromBrowser();
      addLog(`📦 Cookies capturados: ${cookies}`, 'info');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Passo 3: Enviar para API
      addLog('📤 Enviando cookies para API...', 'info');
      const data = await sendCookiesToApi();
      addLog('✅ Sessão inicializada com sucesso!', 'success');
      addLog(`📊 ID Login: ${data.idLogin}`, 'success');

    } catch (err) {
      addLog(`❌ Erro: ${err.message}`, 'error');
    }
  };

  // Testa inicialização com cookies específicos
  const handleTestWithSpecificCookies = async () => {
    try {
      setLogs([]);
      addLog('🚀 Testando com cookies específicos...', 'info');

      const specificCookies = "PHPSESSID=abc123def456; user_session=mock_session_token_789";
      addLog(`📦 Usando cookies: ${specificCookies}`, 'info');

      addLog('📤 Enviando para API...', 'info');
      const data = await initializeSession(specificCookies);
      addLog('✅ Sessão inicializada com sucesso!', 'success');
      addLog(`📊 ID Login: ${data.idLogin}`, 'success');

    } catch (err) {
      addLog(`❌ Erro: ${err.message}`, 'error');
    }
  };

  // Testa apenas a consulta de sessão
  const handleGetSessionInfo = async () => {
    try {
      addLog('📡 Consultando informações da sessão...', 'info');
      const data = await getSessionInfo();
      addLog('✅ Dados da sessão obtidos!', 'success');
      addLog(`📊 Usuário: ${data.userData?.dados?.Login?.email || 'N/A'}`, 'success');
    } catch (err) {
      addLog(`❌ Erro: ${err.message}`, 'error');
    }
  };

  // Limpa a sessão
  const handleClearSession = async () => {
    try {
      addLog('🧹 Limpando sessão...', 'info');
      await clearSession();
      addLog('✅ Sessão limpa com sucesso!', 'success');
    } catch (err) {
      addLog(`❌ Erro: ${err.message}`, 'error');
    }
  };

  // Exibe cookies atuais
  const showCurrentCookies = () => {
    const cookies = getCookiesFromBrowser();
    addLog(cookies ? `🍪 Cookies atuais: ${cookies}` : '⚠️ Nenhum cookie encontrado', 'info');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧪 Teste de Autenticação com Cookies</h1>

      {/* Status */}
      <div style={styles.statusBar}>
        {loading && <div style={styles.loading}>⏳ Carregando...</div>}
        {error && <div style={styles.error}>❌ Erro: {error}</div>}
        {sessionData && (
          <div style={styles.success}>
            ✅ Sessão Ativa - ID: {sessionData.idLogin}
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={createMockCookies}
          disabled={loading}
        >
          🍪 Criar Cookies Mock
        </button>

        <button
          style={styles.button}
          onClick={showCurrentCookies}
          disabled={loading}
        >
          👁️ Ver Cookies
        </button>

        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={handleTestFullFlow}
          disabled={loading}
        >
          🚀 Testar Fluxo Completo
        </button>

        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={handleTestWithSpecificCookies}
          disabled={loading}
        >
          🎯 Testar com Cookies Específicos
        </button>

        <button
          style={styles.button}
          onClick={handleGetSessionInfo}
          disabled={loading}
        >
          📡 Consultar Sessão
        </button>

        <button
          style={{ ...styles.button, ...styles.dangerButton }}
          onClick={handleClearSession}
          disabled={loading}
        >
          🧹 Limpar Sessão
        </button>
      </div>

      {/* Logs */}
      <div style={styles.logsContainer}>
        <h3>📋 Logs de Execução</h3>
        <div style={styles.logsBox}>
          {logs.length === 0 ? (
            <div style={styles.emptyLogs}>Nenhum log ainda. Execute alguma ação acima.</div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                style={{
                  ...styles.logEntry,
                  ...(log.type === 'error' && styles.logError),
                  ...(log.type === 'success' && styles.logSuccess),
                }}
              >
                <span style={styles.logTime}>[{log.timestamp}]</span> {log.message}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dados da Sessão */}
      {sessionData && (
        <div style={styles.dataContainer}>
          <h3>📊 Dados da Sessão</h3>
          <div style={styles.dataBox}>
            <div style={styles.dataRow}>
              <strong>ID Login:</strong> {sessionData.idLogin}
            </div>
            <div style={styles.dataRow}>
              <strong>Token:</strong> {sessionData.token}
            </div>
            {sessionData.userData?.dados?.Login && (
              <>
                <div style={styles.dataRow}>
                  <strong>Email:</strong> {sessionData.userData.dados.Login.email}
                </div>
                <div style={styles.dataRow}>
                  <strong>Tipo:</strong> {sessionData.userData.dados.Login.tipo}
                </div>
              </>
            )}
            {sessionData.userData?.dados?.Unidade && (
              <div style={styles.dataRow}>
                <strong>Loja:</strong> {sessionData.userData.dados.Unidade.Fantasia}
              </div>
            )}
            <details style={styles.details}>
              <summary style={styles.summary}>Ver JSON Completo</summary>
              <pre style={styles.jsonPre}>
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div style={styles.instructions}>
        <h3>📖 Como Usar</h3>
        <ol style={styles.instructionsList}>
          <li>Certifique-se de que o <strong>Mock Server</strong> está rodando em <code>http://localhost:3001</code></li>
          <li>Certifique-se de que a <strong>API Spring Boot</strong> está rodando em <code>http://localhost:8080</code></li>
          <li>Clique em <strong>"🚀 Testar Fluxo Completo"</strong> para executar todo o processo</li>
          <li>Acompanhe os logs para ver cada etapa da execução</li>
          <li>Use <strong>"📡 Consultar Sessão"</strong> para verificar se a sessão está ativa</li>
        </ol>
      </div>
    </div>
  );
};/*  */

// Estilos
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#333',
    borderBottom: '3px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  statusBar: {
    marginBottom: '20px',
    minHeight: '40px',
  },
  loading: {
    background: '#fff3cd',
    color: '#856404',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ffeaa7',
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #f5c6cb',
  },
  success: {
    background: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #c3e6cb',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    background: '#6c757d',
    color: 'white',
    transition: 'all 0.3s',
  },
  primaryButton: {
    background: '#007bff',
  },
  dangerButton: {
    background: '#dc3545',
  },
  logsContainer: {
    marginBottom: '30px',
  },
  logsBox: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '15px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  emptyLogs: {
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px',
  },
  logEntry: {
    padding: '8px',
    marginBottom: '5px',
    borderRadius: '3px',
    background: 'white',
    borderLeft: '3px solid #007bff',
  },
  logError: {
    borderLeft: '3px solid #dc3545',
    background: '#fff5f5',
  },
  logSuccess: {
    borderLeft: '3px solid #28a745',
    background: '#f0fff4',
  },
  logTime: {
    color: '#6c757d',
    fontSize: '12px',
    marginRight: '8px',
  },
  dataContainer: {
    marginBottom: '30px',
  },
  dataBox: {
    background: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '20px',
  },
  dataRow: {
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  details: {
    marginTop: '15px',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '4px',
  },
  jsonPre: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '400px',
    fontSize: '12px',
  },
  instructions: {
    background: '#e7f3ff',
    padding: '20px',
    borderRadius: '4px',
    border: '1px solid #b8daff',
  },
  instructionsList: {
    marginTop: '10px',
    lineHeight: '1.8',
  },
};

export default TestAuthComponent;