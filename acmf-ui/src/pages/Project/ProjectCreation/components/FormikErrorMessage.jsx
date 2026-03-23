import React from 'react';
import { ErrorMessage } from 'formik';

/**
 * FormikErrorMessage - A reusable component for displaying Formik validation errors
 * @param {string} name - The name of the field to show error for
 * @param {string} className - Additional CSS classes for styling
 */
const FormikErrorMessage = ({ name, className = "" }) => {
  return (
    <ErrorMessage name={name}>
      {msg => (
        <div className={`text-red-600 text-sm mt-1 ${className}`}>
          {msg}
        </div>
      )}
    </ErrorMessage>
  );
};

export default FormikErrorMessage;