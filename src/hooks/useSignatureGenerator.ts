import { useState } from 'react';

interface SignatureData {
  fullName: string;
  position: string;
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
}

export const useSignatureGenerator = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: '',
    position: '',
    email: '',
    phone: '',
    additionalLink: '',
    additionalLinkText: ''
  });

  const [copySuccess, setCopySuccess] = useState(false);

  const generateHTML = () => {
    return `
<table cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-family: Roboto, Arial, sans-serif;">
  <tr>
    <td style="vertical-align: top; padding-right: 16px; width: 80px;">
      <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=80&h=80" alt="UCN Logo" style="width: 70px; height: 70px; border-radius: 4px;" />
    </td>
    <td style="vertical-align: top;">
      <div>
        ${signatureData.fullName ? `
        <div style="font-size: 16px; font-weight: bold; color: #2C3E50; margin-bottom: 4px;">
          ${signatureData.fullName}
        </div>` : ''}
        
        ${signatureData.position ? `
        <div style="font-size: 14px; color: #555555; margin-bottom: 8px; line-height: 1.4;">
          ${signatureData.position}
        </div>` : ''}

        <div style="font-size: 13px; line-height: 1.5;">
          ${signatureData.email ? `
          <div style="margin-bottom: 3px;">
            <span style="color: #555555;">✉ </span>
            <a href="mailto:${signatureData.email}" style="color: #6B88A3; text-decoration: none;">
              ${signatureData.email}
            </a>
          </div>` : ''}
          
          ${signatureData.phone ? `
          <div style="margin-bottom: 3px;">
            <span style="color: #555555;">📞 </span>
            <span style="color: #555555;">${signatureData.phone}</span>
          </div>` : ''}
          
          ${signatureData.additionalLink ? `
          <div style="margin-bottom: 3px;">
            <span style="color: #555555;">🔗 </span>
            <a href="${signatureData.additionalLink}" style="color: #6B88A3; text-decoration: none;">
              ${signatureData.additionalLinkText || signatureData.additionalLink}
            </a>
          </div>` : ''}
        </div>

        <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e5e5;">
          <div style="font-size: 12px; color: #B65A2C; font-weight: 600;">
            Universidad Católica del Norte
          </div>
        </div>
      </div>
    </td>
  </tr>
</table>`.trim();
  };

  const copyToClipboard = async () => {
    try {
      const html = generateHTML();
      
      // Create a blob with HTML content
      const blob = new Blob([html], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({
        'text/html': blob,
        'text/plain': new Blob([html], { type: 'text/plain' })
      });
      
      await navigator.clipboard.write([clipboardItem]);
      setCopySuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      
      // Fallback method
      try {
        await navigator.clipboard.writeText(generateHTML());
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
    }
  };

  const updateField = (field: keyof SignatureData, value: string) => {
    setSignatureData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setSignatureData({
      fullName: '',
      position: '',
      email: '',
      phone: '',
      additionalLink: '',
      additionalLinkText: ''
    });
    setCopySuccess(false);
  };

  return {
    signatureData,
    copySuccess,
    updateField,
    copyToClipboard,
    resetForm,
    generateHTML
  };
};