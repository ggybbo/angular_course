import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // query params를 이용하는 2가지 방법
    // console.log(this.route.snapshot.queryParams); // snapshot은 처음에 로드된 값이 유지되고 중간에 값이 변경되도 자동으로 반영되지 않는다
    // console.log(this.route.snapshot.fragment);
    this.route.queryParams
        .subscribe((queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        });
    this.route.fragment
        .subscribe(() => {

        });
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean  {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changeSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
