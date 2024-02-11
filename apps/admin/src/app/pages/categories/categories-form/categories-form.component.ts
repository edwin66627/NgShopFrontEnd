import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoriesService } from '@mycompany/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
  }
  
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };

    this._addCategory(category);
  }

  private _addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe({
      next: (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created!`
        })
        timer(2000)
          .subscribe(() => {
            this.location.back();
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created!'
        });
      }  
    });
  }

  onCancel() {
    this.location.back();
  }

  get categoryForm() {
    return this.form.controls;
  }

}
