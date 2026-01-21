import type { UserProfile } from '@ethossphere/shared';

export type EthosSphereClientOptions = {
  baseUrl?: string;
};

export class EthosSphereClient {
  private readonly baseUrl: string;

  constructor(opts: EthosSphereClientOptions = {}) {
    this.baseUrl = (opts.baseUrl ?? 'http://localhost:4000').replace(/\/+$/, '');
  }

  async health(): Promise<{ ok: boolean; service: string; ts: string }> {
    const res = await fetch(`${this.baseUrl}/health`);
    if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
    return (await res.json()) as { ok: boolean; service: string; ts: string };
  }

  // Placeholder for PRD-aligned endpoints
  async getUserProfile(_address: string): Promise<UserProfile> {
    throw new Error('Not implemented');
  }
}

