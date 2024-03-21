import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsersRequest, UsersService } from '@mycompany/users';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
  
  deleteUser(userId: string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe({
          next: () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          } 
        });
      }
    });
  }

  loadPage($event){
    this.pageNumber = $event.first / $event.rows;
    this.sortColumn = $event.sortField ? $event.sortField : "firstName";
    this.sortDirection = $event.sortOrder == 1 ? "ASC" : "DESC";
    this._getUsers();
  }

}
