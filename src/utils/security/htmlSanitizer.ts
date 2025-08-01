
import DOMPurify from 'dompurify';
import React from 'react';

/**
 * Configuration for different sanitization levels
 */
const SANITIZE_CONFIG = {
  // For content that should only contain plain text
  PLAIN_TEXT: {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  },
  // For basic formatted content (line breaks, basic formatting)
  BASIC_HTML: {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  }
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string, level: 'PLAIN_TEXT' | 'BASIC_HTML' = 'PLAIN_TEXT'): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const config = SANITIZE_CONFIG[level];
  return DOMPurify.sanitize(html, config);
};

/**
 * Safely converts text with line breaks to JSX elements
 */
export const safeTextWithLineBreaks = (text: string): JSX.Element[] => {
  const sanitizedText = sanitizeHtml(text, 'PLAIN_TEXT');
  return sanitizedText.split('\n').map((line, index) => 
    React.createElement('span', { key: index }, [
      line,
      index < sanitizedText.split('\n').length - 1 ? React.createElement('br') : null
    ].filter(Boolean))
  );
};

/**
 * Validates and sanitizes user input
 */
export const sanitizeUserInput = (input: string, maxLength: number = 10000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove any potential script tags and malicious content
  const sanitized = sanitizeHtml(input, 'PLAIN_TEXT');
  
  // Limit length to prevent DoS attacks
  return sanitized.slice(0, maxLength);
};
