import React from 'react';
import Header from './components/Header';
import SignatureForm from './components/SignatureForm';
import NewSignaturePreview from './components/NewSignaturePreview';
import { useSignatureGenerator } from './hooks/useSignatureGenerator';

function App() {
  const {
    signatureData,
    copySuccess,
    updateField,
    updatePosition,
    addPosition,
    removePosition,
    copyToClipboard,
    resetForm
  } = useSignatureGenerator();

  const hasPosition = signatureData.positions && signatureData.positions.some(pos => pos.trim() !== '');
  const isFormValid = signatureData.fullName && hasPosition && signatureData.email;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main className="flex flex-col md:flex-row h-full">
        {/* Sidebar Form */}
        <aside className="w-full md:max-w-xl bg-white p-6 flex-shrink-0 flex flex-col">
          <SignatureForm
            data={signatureData}
            onUpdate={updateField}
            onUpdatePosition={updatePosition}
            onAddPosition={addPosition}
            onRemovePosition={removePosition}
            onReset={resetForm}
          />
        </aside>
        {/* Preview */}
        <section className="bg-white flex-1 flex flex-col justify-center items-center h-screen">
          <NewSignaturePreview
            data={signatureData}
            onCopy={copyToClipboard}
            success={copySuccess}
            disabled={!isFormValid}
          />
        </section>
      </main>

    </div>
  );
}

export default App;