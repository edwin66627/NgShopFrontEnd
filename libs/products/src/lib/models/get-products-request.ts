export class GetProductsRequest{
    pageSize?: number;
    pageNumber?: number;
    sortColumn?: string;
    sortDirection?: string;
    isFeatured?: boolean;
    categories?: number[] = [];
}