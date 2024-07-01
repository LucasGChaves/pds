export class Address {

    state!: number;
    city!: string;
    district!: string;
    street!: string;
    number!: number;
    userId!: number;
    
    constructor (address: Partial<Address>) {
      Object.assign(this, address);
    }
  }