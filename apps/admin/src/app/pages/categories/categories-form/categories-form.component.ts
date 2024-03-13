import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoriesService } from '@mycompany/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  currentCategoryId: string;
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  loading = false;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }
  
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.loading = true;

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };

    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
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
            this.loading = false;
            this.location.back();
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created!'
        });
        this.loading = false;
      }  
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated!'
        });
        timer(2000)
          .subscribe(() => {
            this.loading = false;
            this.location.back();
          });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not updated!'
        });
        this.loading = false;
      } 
    });
  }

  onCancel() {
    this.location.back();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe((category) => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

}
