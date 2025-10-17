import {CategoryEntity} from "@/features/category/domain/entity/category.entity";

export class CategoryModel extends CategoryEntity {
    constructor(params: { id: number; name: string; description: string; icon: string }) {
        super(params);
    }

    static fromEntity(entity: CategoryEntity): CategoryModel {
        return new CategoryModel({
            id: entity.id,
            name: entity.name,
            description: entity.description,
            icon: entity.icon,
        });
    }
}