export interface TokenService {
    generate(payload: { sub: number; email: string; }): string;
    verify(token: string): { sub: number; email: string; };
}