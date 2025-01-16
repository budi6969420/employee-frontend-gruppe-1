import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly apiUrl = 'https://authproxy.szut.dev';
  private readonly clientId = 'employee-management-service';
  private readonly tokenKey = 'employee_auth_token';
  private readonly tokenTimestampKey = 'employee_auth_token_timestamp';
  private readonly tokenExpiryKey = 'employee_auth_token_expiry';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const existingToken = this.getTokenFromMemory();
    if (this.isTokenValid() && existingToken) return of(existingToken);

    return this.fetchToken(username, password).pipe(
      tap(tokenResponse => {
        const { access_token, expires_in } = tokenResponse;

        localStorage.setItem(this.tokenKey, access_token);
        localStorage.setItem(this.tokenTimestampKey, Math.floor(Date.now() / 1000).toString());
        localStorage.setItem(this.tokenExpiryKey, expires_in.toString());
      }),
      map(tokenResponse => tokenResponse.access_token)
    );
  }


  public isTokenValid() : boolean {
    const existingToken = localStorage.getItem(this.tokenKey);
    const tokenTimestamp = localStorage.getItem(this.tokenTimestampKey);
    const tokenExpiry = localStorage.getItem(this.tokenExpiryKey);

    if (existingToken && tokenTimestamp && tokenExpiry) {
      const requestedTime = parseInt(tokenTimestamp, 10);
      const expiresIn = parseInt(tokenExpiry, 10);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < requestedTime + expiresIn) {
        return true;
      }
    }
    return false;
  }
  private fetchToken(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.clientId)
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(this.apiUrl, body.toString(), { headers });
  }

  getTokenFromMemory() {
    return localStorage.getItem(this.tokenKey);
  }

  public removeTokenFromMemory() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenTimestampKey);
    localStorage.removeItem(this.tokenExpiryKey);
  }
}
