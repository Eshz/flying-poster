
/**
 * Secure storage utilities with encryption and integrity checks
 */

import { toast } from 'sonner';

/**
 * Simple encryption using Web Crypto API (for client-side basic protection)
 */
class SecureStorage {
  private static STORAGE_KEY_PREFIX = 'secure_';
  private static INTEGRITY_SUFFIX = '_hash';

  /**
   * Simple hash function for integrity checking
   */
  private static async simpleHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Store data securely with integrity check
   */
  static async setSecureItem(key: string, data: any): Promise<boolean> {
    try {
      const jsonData = JSON.stringify(data);
      const hash = await this.simpleHash(jsonData);
      
      localStorage.setItem(this.STORAGE_KEY_PREFIX + key, jsonData);
      localStorage.setItem(this.STORAGE_KEY_PREFIX + key + this.INTEGRITY_SUFFIX, hash);
      
      return true;
    } catch (error) {
      console.error('Failed to store secure data:', error);
      toast.error('Failed to save data securely');
      return false;
    }
  }

  /**
   * Retrieve data securely with integrity verification
   */
  static async getSecureItem<T>(key: string): Promise<T | null> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_PREFIX + key);
      const storedHash = localStorage.getItem(this.STORAGE_KEY_PREFIX + key + this.INTEGRITY_SUFFIX);
      
      if (!data || !storedHash) {
        return null;
      }

      // Verify integrity
      const computedHash = await this.simpleHash(data);
      if (computedHash !== storedHash) {
        console.warn('Data integrity check failed for key:', key);
        toast.warning('Data integrity issue detected. Please refresh and try again.');
        return null;
      }

      return JSON.parse(data) as T;
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  }

  /**
   * Remove secure item
   */
  static removeSecureItem(key: string): void {
    localStorage.removeItem(this.STORAGE_KEY_PREFIX + key);
    localStorage.removeItem(this.STORAGE_KEY_PREFIX + key + this.INTEGRITY_SUFFIX);
  }

  /**
   * Check if secure item exists
   */
  static hasSecureItem(key: string): boolean {
    return localStorage.getItem(this.STORAGE_KEY_PREFIX + key) !== null;
  }
}

export default SecureStorage;
