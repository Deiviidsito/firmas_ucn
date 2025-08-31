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
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      <Header />
      <main className="flex flex-1 md:flex-row overflow-hidden">
        {/* Sidebar Form */}
        <aside className="w-full md:w-2/5 lg:w-1/3 bg-white px-8 py-6 flex-shrink-0 overflow-y-auto border-r border-gray-100">
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
        <section className="bg-gray-50 flex-2 w-full md:w-3/5 lg:w-2/3 flex items-center justify-center p-8 overflow-y-auto">
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