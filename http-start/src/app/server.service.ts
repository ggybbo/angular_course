import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  storeServers(servers: any[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(
    //   'https://pam-test-59eec.firebaseio.com/data2.json',
    //   servers,
    //   { headers: headers }
    // );
    return this.http.put(
      'https://pam-test-59eec.firebaseio.com/data.json',
      servers,
      { headers: headers }
    );
  }

  getServers() {
    return this.http
      .get('https://pam-test-59eec.firebaseio.com/data.json')
      .pipe(
        map(response => {
          const data = response;
          return data;
        })
      );
    // .map(response => {
    //   const data = response;
    //   return data;
    // });
  }
}
