import { Address } from './../../../../../../libs/users/src/lib/models/address';
import { RolesService } from './../../../../../../libs/users/src/lib/services/roles.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  addresses: Address[] = [];
  countries = [];
  currentUserId: number;
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  loading = false;
  roles: Role[] = [];

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
    this._checkEditMode();
    if(!this.editmode)this.addAddressFormGroup();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.minLength(3)]],
      lastName: ['', [Validators.required,Validators.minLength(3)]],
      username: ['', [Validators.required,Validators.minLength(6)]],
      password: ['', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      roles: ['', Validators.required],
      addresses: new FormArray([])
    });
  }

  private _getRoles(){
    this.rolesService.getRoles().subscribe(roles => this.roles = roles);
  }
  
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  addAddressFormGroup(){
    this.addressessFormArray.push(this.formBuilder.group({
      id: new FormControl(''),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    }));
  }

  removeAddressFormGroup(index: number){
    this.addressessFormArray.removeAt(index);
  }

  onCancel(){
    this.location.back();
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.loading = true;

    const user = new User();
    user.firstName = this.userForm.firstName.value;
    user.lastName = this.userForm.lastName.value;
    user.username = this.userForm.username.value;
    user.roles = this.userForm.roles.value;
    user.email = this.userForm.email.value;
    user.phone = this.userForm.phone.value;
    user.password = this.userForm.password.value;
    user.addresses = this.userForm.addresses.value;
    
    if (this.editmode) {
      user.id = this.currentUserId;
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
    this.loading = false;
  }

  private _addUser(user: User){
    this.usersService.createUser(user).subscribe({
      next: (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.username} was created!`
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

  private _updateUser(user: User){
    this.usersService.updateUser(user).subscribe({
      next: (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.username} was updated!`
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
          detail: 'User was not updated!'
        });
      }
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.firstName.setValue(user.firstName);
          this.userForm.lastName.setValue(user.lastName);
          this.userForm.username.setValue(user.username);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          user.addresses.forEach(address => {
            this.addressessFormArray.push(this.formBuilder.group({
              id: address.id,
              street: address.street,
              city: address.city,
              state: address.state,
              country: address.country
            }));
          });
          
          const userRoles = [];
          user.roles.forEach(role => {
            const userRole = new Role();
            userRole.id = role.id;
            userRole.name = role.name;
            userRole.authorities = null;
            userRoles.push(userRole);
          });
          this.userForm.roles.setValue(userRoles);

          this.userForm.password.disable();
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }

  get addressessFormArray() {
    return this.userForm.addresses as FormArray;
  }

}
