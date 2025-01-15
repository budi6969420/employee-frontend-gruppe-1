import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly apiUrl = 'http://authproxy.szut.dev';
  private readonly clientId = 'employee-management-service';
  private readonly username = 'user';
  private readonly password = 'test';
  private readonly tokenKey = 'employee_auth_token';
  private readonly tokenTimestampKey = 'employee_auth_token_timestamp';
  private readonly tokenExpiryKey = 'employee_auth_token_expiry';

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    const existingToken = localStorage.getItem(this.tokenKey);
    const tokenTimestamp = localStorage.getItem(this.tokenTimestampKey);
    const tokenExpiry = localStorage.getItem(this.tokenExpiryKey);

    if (existingToken && tokenTimestamp && tokenExpiry) {
      const requestedTime = parseInt(tokenTimestamp, 10);
      const expiresIn = parseInt(tokenExpiry, 10);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < requestedTime + expiresIn) {
        return of(existingToken);
      }
    }

    return this.fetchToken().pipe(
      tap(tokenResponse => {
        const { access_token, expires_in } = tokenResponse;

        localStorage.setItem(this.tokenKey, access_token);
        localStorage.setItem(this.tokenTimestampKey, Math.floor(Date.now() / 1000).toString());
        localStorage.setItem(this.tokenExpiryKey, expires_in.toString());
      }),
      map(tokenResponse => tokenResponse.access_token)
    );
  }

  private fetchToken(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.clientId)
      .set('username', this.username)
      .set('password', this.password);

    return this.http.post<any>(this.apiUrl, body.toString(), { headers });
  }
}
