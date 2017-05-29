export class Product {
  public id:                  number;
  public serialNumber:        string;
  public name:                string;
  public description:         string;
  public category:            string;
  public warrantyExpiration:  string;
  public price:               number;
  public currency:            string;

  constructor(product: any = null) {
    this.id                 = product ? product.Id : null;
    this.serialNumber       = product ? product.SerialNumber : '';
    this.name               = product ? product.Name : '';
    this.description        = product ? product.Description : '';
    this.category           = product ? product.Category : '';
    this.warrantyExpiration = product ? product.WarrantyExpiration : '';
    this.price              = product ? product.Price : null;
    this.currency           = product ? product.Currency : '';
  }
}