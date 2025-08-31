import { useState } from 'react';

export interface SignatureData {
  fullName: string;
  email: string;
  phone: string;
  positions: string[];
  department: string;
  campus: string;
  additionalLink?: string;
  additionalLinkText?: string;
  social?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const useSignatureGenerator = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: '',
    email: '',
    phone: '',
    positions: [''],
    department: '',
    campus: ''
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
      department: '',
      campus: ''
    });
    setCopySuccess(false);
  };

  const generateHTML = (): string => {
    const positionsHTML = signatureData.positions
      .filter(pos => pos.trim())
      .map(pos => `<div style="font-size: 16px; color: #1f2937; line-height: 1.25; margin-bottom: 4px;">${pos}</div>`)
      .join('');

    const socialIcons: Record<string, string> = {
      linkedin: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
      twitter: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
      facebook: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
      instagram: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    };

    const socialHTML = signatureData.social
      ? `<div style='margin-top:16px;display:flex;gap:12px;'>${Object.entries(signatureData.social)
          .map(([key, url]) =>
            url
              ? `<a href='${url}' target='_blank' rel='noopener noreferrer' style='display:inline-block;'>
                  <img src='${socialIcons[key]}' alt='${key}' style='width:32px;height:32px;border-radius:50%;background:#818cf8;padding:4px;display:inline-block;' />
                </a>`
              : ''
          )
          .join('')}
        </div>`
      : '';

    return `
    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; min-width: 650px;">
      <tr style="vertical-align: top;">
        <td style="padding-right: 24px; vertical-align: top;">
          <img src="https://i.postimg.cc/3RMdxN8Z/disc.png" alt="Logo UCN" style="width: 90px; height: 90px; object-fit: contain; display: block; vertical-align: top;">
        </td>
        <td style="vertical-align: top; min-width: 500px;">
          <div>
            <div style="margin-bottom: 4px;">
              <span style="font-size: 18px; font-weight: bold; color: #000000;">${signatureData.fullName}</span>
            </div>
            ${positionsHTML}
            <div style="font-size: 14px; color: #6b7280; line-height: 1.25; margin-bottom: 4px; white-space: nowrap;">Departamento de Ingeniería de Sistemas y Computación</div>
            <div style="font-size: 14px; color: #6b7280; line-height: 1.25; margin-bottom: 4px;">Universidad Católica del Norte</div>
            <div style="font-size: 14px; color: #6b7280; line-height: 1.25; margin-bottom: 4px;">Av. Angamos 0610, Antofagasta</div>
            ${signatureData.phone ? `<div style=\"font-size: 14px; color: #1f2937; margin-bottom: 4px;\">${signatureData.phone}</div>` : ''}
            ${signatureData.email ? `<div style=\"font-size: 14px; margin-bottom: 4px;\"><a href=\"mailto:${signatureData.email}\" style=\"color: #1d4ed8; text-decoration: underline;\">${signatureData.email}</a></div>` : ''}
            ${signatureData.additionalLink ? `<div style=\"font-size: 14px; margin-bottom: 4px;\"><a href=\"${signatureData.additionalLink}\" style=\"color: #1d4ed8; text-decoration: underline;\">${signatureData.additionalLinkText || signatureData.additionalLink}</a></div>` : ''}
            ${socialHTML}
            <hr style="margin-top: 16px; border: none; border-top: 1px solid #1e3a8a;">
          </div>
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
