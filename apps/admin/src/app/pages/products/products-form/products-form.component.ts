import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService, Upload } from '@mycompany/products';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

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
    private location: Location,
    private messageService: MessageService,
    private productsService: ProductsService
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
        this.form.patchValue({ image: file });
      };
      fileReader.readAsDataURL(file);
      this.imagesUploaded.push(tempFile);
    }
  }

  removeImage(index: number){
    this.imagesUploaded.splice(index, 1);

    if(this.imagesUploaded.length == 0)
    this.form.patchValue({ image: "" });
  }

  onCancel(){
    this.location.back();
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const product = this.returnProductToSave();
    console.log("Product: ", product);
    const jsonForm = JSON.stringify(product);
    console.log("Json Form: ", jsonForm);
    const blob = new Blob([jsonForm], {
      type: 'application/json'
    });
    const productFormData = new FormData();
    productFormData.append("product", blob);
    this.imagesToSave = this.imagesUploaded.map(image => image.file);
    for(let i = 0; i < this.imagesToSave.length; i++){
      productFormData.append("images", this.imagesToSave[i])
    }
    this._addProduct(productFormData);
  }

  private _addProduct(productData: FormData){
    console.log("Data to save: ", productData);
    this.productsService.createProduct(productData).subscribe({
      next: (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
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
          detail: 'Product is not created!'
        });
      }
    })  
  }

  get productForm() {
    return this.form.controls;
  }

  private returnProductToSave(){
    const product = new Product();
    product.name = this.productForm.name.value;
    product.brand = this.productForm.brand.value;
    product.price = this.productForm.price.value;
    product.countInStock = this.productForm.countInStock.value;
    const category = new Category();
    category.id = this.productForm.category.value;
    product.category = category;
    product.isFeatured = this.productForm.isFeatured.value;
    product.description = this.productForm.description.value;
    product.richDescription = this.productForm.richDescription.value;
    return product;
  }

}
