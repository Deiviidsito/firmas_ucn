import { useState, useCallback } from 'react';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationRules {
  fullName: {
    required: boolean;
    maxLength: number;
    pattern: RegExp;
    message: string;
  };
  positions: {
    required: boolean;
    maxLength: number;
    pattern: RegExp;
    message: string;
  };
  email: {
    required: boolean;
    pattern: RegExp;
    domain: string;
    message: string;
  };
  phone: {
    pattern: RegExp;
    message: string;
  };
  url: {
    pattern: RegExp;
    message: string;
  };
}

const validationRules: ValidationRules = {
  fullName: {
    required: true,
    maxLength: 60,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
    message: 'Solo letras, espacios, guiones y apostrofes. Máximo 60 caracteres.'
  },
  positions: {
    required: true,
    maxLength: 80,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.,()-/]+$/,
    message: 'Solo letras, espacios y signos de puntuación básicos. Máximo 80 caracteres.'
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    domain: 'ucn.cl',
    message: 'Debe ser un email válido, preferiblemente @ucn.cl'
  },
  phone: {
    pattern: /^[\+]?[0-9\s\-\(\)]{7,20}$/,
    message: 'Formato: +56 9 1234 5678 o similar (7-20 caracteres)'
  },
  url: {
    pattern: /^https?:\/\/[^\s<>"{}|\\^`\[\]]+$/,
    message: 'Debe ser una URL válida que comience con http:// o https://'
  }
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateField = useCallback((field: string, value: string): string | null => {
    if (!value && field !== 'phone') {
      // Los campos opcionales no requieren validación si están vacíos
      if (['phone', 'googleScholar', 'linkedin', 'orcid', 'website'].includes(field)) {
        return null;
      }
    }

    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'El nombre completo es obligatorio';
        if (value.length > validationRules.fullName.maxLength) {
          return `Máximo ${validationRules.fullName.maxLength} caracteres`;
        }
        if (!validationRules.fullName.pattern.test(value)) {
          return validationRules.fullName.message;
        }
        break;

      case 'position':
        if (!value.trim()) return 'El cargo es obligatorio';
        if (value.length > validationRules.positions.maxLength) {
          return `Máximo ${validationRules.positions.maxLength} caracteres`;
        }
        if (!validationRules.positions.pattern.test(value)) {
          return validationRules.positions.message;
        }
        break;

      case 'email':
        if (!value.trim()) return 'El email es obligatorio';
        if (!validationRules.email.pattern.test(value)) {
          return 'Formato de email inválido';
        }
        if (!value.includes(validationRules.email.domain)) {
          return 'Se recomienda usar email institucional @ucn.cl';
        }
        break;

      case 'phone':
        if (value && !validationRules.phone.pattern.test(value)) {
          return validationRules.phone.message;
        }
        break;

      case 'url':
        if (value && !validationRules.url.pattern.test(value)) {
          return validationRules.url.message;
        }
        break;

      default:
        return null;
    }

    return null;
  }, []);

  const validateForm = useCallback((data: any): ValidationError[] => {
    const newErrors: ValidationError[] = [];

    // Validar nombre completo
    const nameError = validateField('fullName', data.fullName || '');
    if (nameError) {
      newErrors.push({ field: 'fullName', message: nameError });
    }

    // Validar posiciones
    const filledPositions = data.positions?.filter((pos: string) => pos.trim()) || [];
    if (filledPositions.length === 0) {
      newErrors.push({ field: 'positions', message: 'Al menos un cargo es obligatorio' });
    } else {
      filledPositions.forEach((pos: string, index: number) => {
        const posError = validateField('position', pos);
        if (posError) {
          newErrors.push({ field: `position-${index}`, message: posError });
        }
      });
    }

    // Validar email
    const emailError = validateField('email', data.email || '');
    if (emailError) {
      newErrors.push({ field: 'email', message: emailError });
    }

    // Validar teléfono (opcional)
    if (data.phone) {
      const phoneError = validateField('phone', data.phone);
      if (phoneError) {
        newErrors.push({ field: 'phone', message: phoneError });
      }
    }

    // Validar URLs sociales (opcionales)
    const socialFields = [
      { field: 'googleScholar', value: data.social?.googleScholar },
      { field: 'linkedin', value: data.social?.linkedin },
      { field: 'orcid', value: data.orcid },
      { field: 'website', value: data.website }
    ];

    socialFields.forEach(({ field, value }) => {
      if (value) {
        const urlError = validateField('url', value);
        if (urlError) {
          newErrors.push({ field, message: urlError });
        }
      }
    });

    setErrors(newErrors);
    return newErrors;
  }, [validateField]);

  const getFieldError = useCallback((fieldName: string): string | null => {
    const error = errors.find(err => err.field === fieldName);
    return error ? error.message : null;
  }, [errors]);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => prev.filter(err => err.field !== fieldName));
  }, []);

  const hasErrors = errors.length > 0;

  return {
    errors,
    validateField,
    validateForm,
    getFieldError,
    clearFieldError,
    hasErrors,
    setErrors
  };
};