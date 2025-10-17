export class CategoryEntity {
  public id: number;
  public name: string;
  public description: string;
  public icon: string;

  constructor(params: {
    id: number;
    name: string;
    description: string;
    icon: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.icon = params.icon;
  }
}
