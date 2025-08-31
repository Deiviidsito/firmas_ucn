import React from 'react';
import Header from './components/Header';
import SignatureForm from './components/SignatureForm';
import SignaturePreview from './components/SignaturePreview';
import CopyButton from './components/CopyButton';
import { useSignatureGenerator } from './hooks/useSignatureGenerator';

function App() {
  const {
    signatureData,
    copySuccess,
    updateField,
    updatePosition,
    addPosition,
    copyToClipboard,
    resetForm
  } = useSignatureGenerator();

  // Check if required fields are filled
  const hasPosition = signatureData.positions && signatureData.positions.some(pos => pos.trim() !== '');
  const isFormValid = signatureData.fullName && hasPosition && signatureData.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <SignatureForm
              data={signatureData}
              onUpdate={updateField}
              onUpdatePosition={updatePosition}
              onAddPosition={addPosition}
              onReset={resetForm}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <SignaturePreview data={signatureData} />
            
            {/* Copy Button */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <CopyButton
                onCopy={copyToClipboard}
                success={copySuccess}
                disabled={!isFormValid}
              />
              
              {!isFormValid && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Completa los campos obligatorios:</strong> Nombre, Cargo y Email
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Cómo usar tu firma en Gmail
            </h3>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="bg-[#6B88A3] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p>Completa todos los campos del formulario y haz clic en <strong>"Copiar Firma"</strong></p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#6B88A3] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p>Ve a <strong>Gmail → Configuración → Ver toda la configuración → General</strong></p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#6B88A3] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p>En la sección <strong>"Firma"</strong>, pega la firma copiada y guarda los cambios</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#B65A2C] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <p>¡Listo! Tu firma corporativa UCN aparecerá en todos tus emails</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#2C3E50] text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-300">
            © 2025 Universidad Católica del Norte - Generador de Firmas Gmail
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;