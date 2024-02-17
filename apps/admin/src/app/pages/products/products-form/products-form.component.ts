import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Upload } from '@mycompany/products';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  catagories = [];
  form: FormGroup
  imageDisplay: string | ArrayBuffer;
  imagesToSave: File[] = [];
  isSubmitted = false;
  imagesUploaded: Upload[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private location: Location
  ){}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;
    });
  }

  onImageUpload(event){
    const file = event.target.files[0];
    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
      const tempFile = new Upload();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        tempFile.file = file;
        tempFile.url = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.imagesUploaded.push(tempFile);
    }
  }

  removeImage(index: number){
    this.imagesUploaded.splice(index, 1);
  }

  onCancel(){
    this.location.back();
  }

  onSubmit(){
    this.isSubmitted = true;
  }

  get productForm() {
    return this.form.controls;
  }

}
