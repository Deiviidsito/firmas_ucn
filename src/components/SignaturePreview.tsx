import React from 'react';

interface SignatureData {
  fullName: string;
  position: string;
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
}

interface SignaturePreviewProps {
  data: SignatureData;
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Vista Previa</h3>
      
      <div className="signature-preview" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
        <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tr>
            <td style={{ verticalAlign: 'top', paddingRight: '16px', width: '80px' }}>
              <img 
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=80&h=80"
                alt="UCN Logo"
                style={{ width: '70px', height: '70px', borderRadius: '4px' }}
              />
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <div>
                {data.fullName && (
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#2C3E50',
                    marginBottom: '4px'
                  }}>
                    {data.fullName}
                  </div>
                )}
                
                {data.position && (
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#555555',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                  }}>
                    {data.position}
                  </div>
                )}

                <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  {data.email && (
                    <div style={{ marginBottom: '3px' }}>
                      <span style={{ color: '#555555' }}>✉ </span>
                      <a href={`mailto:${data.email}`} style={{ 
                        color: '#6B88A3', 
                        textDecoration: 'none' 
                      }}>
                        {data.email}
                      </a>
                    </div>
                  )}
                  
                  {data.phone && (
                    <div style={{ marginBottom: '3px' }}>
                      <span style={{ color: '#555555' }}>📞 </span>
                      <span style={{ color: '#555555' }}>{data.phone}</span>
                    </div>
                  )}
                  
                  {data.additionalLink && (
                    <div style={{ marginBottom: '3px' }}>
                      <span style={{ color: '#555555' }}>🔗 </span>
                      <a href={data.additionalLink} style={{ 
                        color: '#6B88A3', 
                        textDecoration: 'none' 
                      }}>
                        {data.additionalLinkText || data.additionalLink}
                      </a>
                    </div>
                  )}
                </div>

                <div style={{
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid #e5e5e5'
                }}>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#B65A2C',
                    fontWeight: '600'
                  }}>
                    Universidad Católica del Norte
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default SignaturePreview;