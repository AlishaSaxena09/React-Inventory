'use client';

import type { User } from '@/types/user';
import axios from 'axios'

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Alisha',
  lastName: 'Saxena',
  username: 'alisha',
} 

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

// class AuthClient {
//   async signUp(_: SignUpParams): Promise<{ error?: string }> {
//     // Make API request
    
//     const token = generateToken();
//     localStorage.setItem('authorization', token);

//     return {};
//   }

//   async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
//     return { error: 'Social authentication not implemented' };
//   }

//   async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
//     const { email, password } = params;

//     // Make API request

//     // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
//     if (email !== 'alisha@gmail.com' || password !== 'alisha09') {
//       return { error: 'Invalid credentials' };
//     }

//     const token = generateToken();
//     localStorage.setItem('custom-auth-token', token);

//     return {};
//   }

//   async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//     return { error: 'Password reset not implemented' };
//   }

//   async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//     return { error: 'Update reset not implemented' };
//   }

//   async getUser(): Promise<{ data?: User | null; error?: string }> {
//     // Make API request

//     // We do not handle the API, so just check if we have a token in localStorage.
//     const token = localStorage.getItem('custom-auth-token');

//     if (!token) {
//       return { data: null };
//     }

//     return { data: user };
//   }

//   async signOut(): Promise<{ error?: string }> {
//     localStorage.removeItem('custom-auth-token');

//     return {};
//   }
// }

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/signup`, params);
      // const token = response.data.token;

      const token = generateToken();
      localStorage.setItem('authorization', token);
      return {};
    } catch (error) {
      console.error("Error during sign-up", error);
      return { error: 'Error during sign-up' };
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (username !== 'alisha' || password !== 'alisha09') {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};

    // try {
    //   const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/login`, { username, password });
    //   // const token = response.data.token;

   
    //   return {};
    // } catch (error) {
    //   console.error("Error during sign-in with password", error);
    //   return { error: 'Invalid credentials' };
    // }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}


export const authClient = new AuthClient();
