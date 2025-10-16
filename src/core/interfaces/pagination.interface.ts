export class Pagination<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;

    constructor(params: {
        data: T[];
        total: number;
        page: number;
        limit: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }) {
        this.data = params.data;
        this.total = params.total;
        this.page = params.page;
        this.limit = params.limit;
        this.hasNextPage = params.hasNextPage;
        this.hasPreviousPage = params.hasPreviousPage;
    }
}