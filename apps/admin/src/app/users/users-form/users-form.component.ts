import { Address } from './../../../../../../libs/users/src/lib/models/address';
import { RolesService } from './../../../../../../libs/users/src/lib/services/roles.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@mycompany/users';
import { User } from 'libs/users/src/lib/models/user';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  countries = [];
  currentUserId: string;
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  roles: Role[] = [];
  addresses: Address[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ){}

  ngOnInit(): void{
    this._initUserForm();
    this._getRoles();
    this._getCountries();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      roles: [''],
      street: [''],
      state: [''],
      city: [''],
      country: ['']
    });
  }

  private _getRoles(){
    this.rolesService.getRoles().subscribe(roles => this.roles = roles);
  }
  
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  onCancel(){
    this.location.back();
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const user = new User();
    const address = new Address();
    user.firstName = this.userForm.firstName.value;
    user.lastName = this.userForm.lastName.value;
    user.username = this.userForm.username.value;
    user.roles = this.userForm.roles.value;
    user.email = this.userForm.email.value;
    user.phone = this.userForm.phone.value;
    user.password = this.userForm.password.value;
    address.street = this.userForm.street.value;
    address.city = this.userForm.city.value;
    address.state = this.userForm.state.value;
    address.country = this.userForm.country.value;
    user.addresses.push(address);
    console.log("Submit data: ", user);

    this.usersService.createUser(user).subscribe({
      next: (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${user.username} is created!`
        });
        timer(2000)
          .subscribe(() => {
            this.location.back();
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User was not created!'
        });
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }

}
