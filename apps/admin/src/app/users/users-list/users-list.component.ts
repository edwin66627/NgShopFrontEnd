import { UsersService } from './../../../../../../libs/users/src/lib/services/users.service';
import { GetUsersRequest } from './../../../../../../libs/users/src/lib/models/get-users-request';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  sortColumn = "firstName";
  loading: boolean;
  pageSize = 2;
  pageNumber = 0;
  sortDirection = "ASC";
  totalElements: number;
  usersRequest: GetUsersRequest;
  users = [];

  constructor(
    private router: Router,  
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers(){
    this.loading = true;
    this.usersRequest = new GetUsersRequest();
    this.usersRequest.pageSize = this.pageSize;
    this.usersRequest.pageNumber = this.pageNumber;
    this.usersRequest.sortColumn = this.sortColumn;
    this.usersRequest.sortDirection = this.sortDirection;
    this.usersService.getUsers(this.usersRequest).subscribe(page => {
      this.users = page.content;
      this.totalElements = page.totalElements;
    });
    this.loading = false;
  }

  getRoleName(roles){
    let userRoles = "";
    roles.forEach((role, i) => {
      userRoles += role.name;
      if (i < roles.length-1) userRoles += ", "
    });
    return userRoles;
  }

  getAddress(addresses){
    return addresses.length > 0 ? addresses[0].country : "";
  }

  updateUser(userid: number){
    this.router.navigateByUrl(`users/form/${userid}`);
  }
  
  deleteUser(){
    console.log("Delete User!!!");
  }

  loadPage($event){
    this.pageNumber = $event.first / $event.rows;
    this.sortColumn = $event.sortField ? $event.sortField : "firstName";
    this.sortDirection = $event.sortOrder == 1 ? "ASC" : "DESC";
    this._getUsers();
  }

}
