import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService, Upload } from '@mycompany/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

import { environment } from 'environments/environment';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  apiURL:string;
  catagories = [];
  currentProductId: number;
  form: FormGroup
  editmode = false;
  imagesToDelete: string[] = [];
  imagesToSave: File[] = [];
  imagesUploaded: Upload[] = [];
  isSubmitted = false;
  loading = false;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
    this.apiURL = environment.apiUrl;
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

  removeImage(index: number, filename: string){
    this.imagesUploaded.splice(index, 1);

    if(this.editmode)
      this.imagesToDelete.push(filename);

    if(this.imagesUploaded.length == 0)
      this.form.patchValue({ image: "" });
  }

  onCancel(){
    this.location.back();
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.loading = true;

    const product = this.returnProductToSave();
    const jsonForm = JSON.stringify(product);
    const productBlob = new Blob([jsonForm], {type: 'application/json'});
    const productFormData = new FormData();
    productFormData.append("product", productBlob);
    for(const image of this.imagesUploaded){
      if(image.file !== undefined) productFormData.append("images", image.file)
    }
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  private _addProduct(productData: FormData){
    this.productsService.createProduct(productData).subscribe({
      next: (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
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
          detail: 'Product is not created!'
        });
        this.loading = false;
      }
    })  
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
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
          detail: 'Product is not updated!'
        });
        this.loading = false;
      }
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.builtImagesUrl(product.image);
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
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
    if(this.imagesToDelete.length > 0) product.imagesToDelete = this.imagesToDelete;
    return product;
  }

  private builtImagesUrl(productImages:string){
    const images = productImages.split(",");
    
    for(const image of images){
      const upload = new Upload();
      upload.filename = image;
      upload.url = this.apiURL+"image/"+image;
      this.imagesUploaded.push(upload);
    }
  }

  get productForm() {
    return this.form.controls;
  }

}
