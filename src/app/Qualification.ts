export class Qualification {
  constructor(public id: number | undefined, public skill: string){
    this.name = skill;
  }
  public name: string;
}
