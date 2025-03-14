export class Employee {
  public name: string;
  constructor(public id?: number,
              public lastName?: string,
              public firstName?: string,
              public street?: string,
              public postcode?: string,
              public city?: string,
              public phone?: string,
              public skillSet?: number[]) {
    this.name = `${this.lastName}, ${this.firstName}`;
  }
}
