import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  storeServers(servers: any[]) {
    return this.http.post(
      'https://pam-test-59eec.firebaseio.com/data2.json',
      servers
    );
  }
}
