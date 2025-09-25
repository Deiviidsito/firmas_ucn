import React from 'react';
import { X, Play, CheckCircle, Copy, Mail, User, GraduationCap } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">¿Cómo usar el Generador de Firmas?</h2>
              <p className="text-sm text-gray-500">Guía paso a paso para crear tu firma institucional</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Paso 1 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Completa tus Datos Personales
              </h3>
              <p className="text-gray-600 mb-3">
                En la pestaña "Datos Personales", ingresa tu información básica:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>Nombre Completo:</strong> Tu nombre y apellidos completos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>Cargo(s):</strong> Puedes agregar múltiples cargos con el botón "+"
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>Correo Electrónico:</strong> Tu email institucional @ucn.cl
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>Teléfono:</strong> Opcional, pero recomendado para contacto directo
                </li>
              </ul>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Agrega Enlaces Académicos (Opcional)
              </h3>
              <p className="text-gray-600 mb-3">
                En la pestaña "Enlaces Académicos", puedes incluir tus perfiles profesionales:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>Google Scholar:</strong> Tu perfil de publicaciones académicas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>LinkedIn:</strong> Tu perfil profesional
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>ORCID:</strong> Tu identificador único de investigador
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>Sitio Web Personal:</strong> Tu página web o portafolio profesional
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <strong>CIARA:</strong> Marca si perteneces al Centro de Innovación en IA
                </li>
              </ul>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Copy className="w-5 h-5 text-purple-600" />
                Copia tu Firma
              </h3>
              <p className="text-gray-600 mb-3">
                Una vez completados los datos, verás la previsualización en tiempo real:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  La firma se actualiza automáticamente mientras escribes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Haz clic en el botón "Copiar firma" cuando esté lista
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  La firma se copia en formato HTML, lista para pegar
                </li>
              </ul>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-600" />
                Configura en Gmail
              </h3>
              <p className="text-gray-600 mb-3">
                Para usar tu nueva firma en Gmail:
              </p>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>Abre Gmail y ve a Configuración (ícono de engranaje)</li>
                <li>En la pestaña "General", busca la sección "Firma"</li>
                <li>Crea una nueva firma o edita una existente</li>
                <li>Pega tu firma copiada en el editor</li>
                <li>Guarda los cambios</li>
              </ol>
            </div>
          </div>

          {/* Tips adicionales */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tips Útiles</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• El logo UCN se adapta automáticamente al tamaño de tu firma</li>
              <li>• Puedes tener hasta 3 cargos diferentes</li>
              <li>• Los campos ORCID y Sitio Web son independientes</li>
              <li>• El logo de CIARA UCN aparecerá si marcas la casilla correspondiente</li>
              <li>• Todos los iconos de redes sociales están optimizados para email</li>
              <li>• La información institucional se incluye automáticamente con logo</li>
              <li>• La firma está optimizada para verse bien en todos los clientes de correo</li>
            </ul>
          </div>

          {/* Video Tutorial */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-600" />
              Video Tutorial Paso a Paso
            </h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/mLTMNgj1thg"
                  title="Tutorial: Generador de Firmas UCN - Guía Completa"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Tutorial oficial: Cómo usar el Generador de Firmas UCN paso a paso
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              ¿Tienes dudas? Contacta al equipo del DISC UCN
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;