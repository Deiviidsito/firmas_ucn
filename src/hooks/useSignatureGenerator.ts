import { useState } from 'react';

export interface SignatureData {
  fullName: string;
  email: string;
  phone?: string;
  positions: string[];
  additionalLink?: string;
  additionalLinkText?: string;
  social?: {
    linkedin?: string;
    googleScholar?: string;
    orcid?: string;
  };
}

export const useSignatureGenerator = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: '',
    email: '',
    phone: '',
    positions: [''],
    social: {
      linkedin: '',
      googleScholar: '',
      orcid: ''
    }
  });

  const [copySuccess, setCopySuccess] = useState(false);

  const updateField = (field: keyof SignatureData, value: string | string[]) => {
    setSignatureData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSignatureData = (field: keyof SignatureData, value: string | string[]) => {
    updateField(field, value);
  };

  const addPosition = () => {
    setSignatureData(prev => ({
      ...prev,
      positions: [...prev.positions, '']
    }));
  };

  const updatePosition = (index: number, value: string) => {
    setSignatureData(prev => ({
      ...prev,
      positions: prev.positions.map((pos, i) => i === index ? value : pos)
    }));
  };

  const removePosition = (index: number) => {
    setSignatureData(prev => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setSignatureData({
      fullName: '',
      email: '',
      phone: '',
      positions: [''],
      social: {
        linkedin: '',
        googleScholar: '',
        orcid: ''
      }
    });
    setCopySuccess(false);
  };

  const calculateLogoSize = (positions: string[]): number => {
    // Base height calculation based on number of filled positions
    const filledPositions = positions.filter(pos => pos.trim()).length;
    const baseHeight = 85; // Reduced base size
    const heightPerPosition = 15; // Reduced height per position
    
    // Calculate height based on content
    const contentHeight = baseHeight + (filledPositions * heightPerPosition);
    
    // Ensure logo size stays within reasonable bounds
    return Math.max(75, Math.min(150, contentHeight));
  };

  const generateHTML = (): string => {
    const logoSize = calculateLogoSize(signatureData.positions);
    const socialLinks = [];
    
    if (signatureData.social?.googleScholar) {
      socialLinks.push({
        href: signatureData.social.googleScholar,
        iconSrc: "https://scholar.google.com/favicon.ico",
        alt: "Google Scholar"
      });
    }
    
    if (signatureData.social?.linkedin) {
      socialLinks.push({
        href: signatureData.social.linkedin,
        iconSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/32px-LinkedIn_logo_initials.png",
        alt: "LinkedIn"
      });
    }
    
    // Convertir el additionalLink en un enlace ORCID si existe
    if (signatureData.additionalLink) {
      socialLinks.push({
        href: signatureData.additionalLink,
        iconSrc: "https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg",
        alt: "ORCID",
        type: 'orcid'
      });
    }

    const socialHTML = socialLinks.length > 0
      ? `<div style="display:flex;gap:3px;margin-top:4px;">
          ${socialLinks.map(({ href, iconSrc, alt }) => 
            `<a href="${href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;line-height:0;">
              <img src="${iconSrc}" alt="${alt}" style="width:12px;height:12px;display:inline-block;border-radius:2px;background:#fff;box-shadow:0 0 1px #ccc;" />
            </a>`
          ).join('')}
        </div>`
      : '';

    // Tabla contenedora exterior para alinear el logo con la línea inferior
    return `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; min-width: 450px; border-collapse: collapse;">
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
            <tr>
              <td width="${logoSize}" style="padding-right: 20px; vertical-align: middle;">
                <img src="https://i.imgur.com/sC4luNO.png" alt="Logo UCN" width="${logoSize}" height="${logoSize}" style="width: ${logoSize}px; height: ${logoSize}px; object-fit: contain; display: block; margin: 0;">
              </td>
              <td style="min-width: 150px;">
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td>
                      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                        <tr>
                          <td style="padding-bottom: 2px;">
                            <span style="font-size: 13px; font-weight: bold; color: #000000; display: inline-block;">${signatureData.fullName}</span>
                          </td>
                        </tr>
                        ${signatureData.positions
                          .filter(pos => pos.trim())
                          .map(pos => `
                            <tr>
                              <td style="padding-bottom: 2px;">
                                <span style="font-size: 11px; color: #1f2937; line-height: 1.15; display: block;">${pos}</span>
                              </td>
                            </tr>
                          `).join('')}
                        <tr>
                          <td style="padding-bottom: 2px;">
                            <span style="font-size: 11px; color: #6b7280; line-height: 1.15; display: block; white-space: nowrap;">Departamento de Ingeniería de Sistemas y Computación</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 2px;">
                            <span style="font-size: 11px; color: #6b7280; line-height: 1.15; display: block;">Universidad Católica del Norte</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 2px;">
                            <span style="font-size: 11px; color: #6b7280; line-height: 1.15; display: block;">Av. Angamos 0610, Antofagasta</span>
                          </td>
                        </tr>
                        ${signatureData.phone ? `
                          <tr>
                            <td style="padding-bottom: 2px;">
                              <span style="font-size: 11px; color: #1f2937; display: block;">${signatureData.phone}</span>
                            </td>
                          </tr>
                        ` : ''}
                        ${signatureData.email ? `
                          <tr>
                            <td style="padding-bottom: 2px;">
                              <a href="mailto:${signatureData.email}" style="font-size: 11px; color: #1d4ed8; text-decoration: underline; display: inline-block;">${signatureData.email}</a>
                            </td>
                          </tr>
                        ` : ''}
                        ${socialHTML ? `
                          <tr>
                            <td style="padding-top: 8px;">
                              ${socialHTML}
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 12px;">
                      <hr style="margin: 0; border: none; border-top: 1px solid #1e3a8a;">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `;
  };

  const copyToClipboard = async (): Promise<boolean> => {
    try {
      const html = generateHTML();
      
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([signatureData.fullName], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(html);
      }
      
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
      
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  };

  return {
    signatureData,
    copySuccess,
    updateField,
    updateSignatureData,
    addPosition,
    updatePosition,
    removePosition,
    resetForm,
    generateHTML,
    copyToClipboard
  };
};
