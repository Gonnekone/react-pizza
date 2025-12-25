export enum SortProperty {
    RATING = "популярности",
    PRICE = "цене",
    TITLE = "алфавиту",
}

export type FilterSliceState = {
    categoryId: number;
    searchValue: string;
    pageNumber: number;
    sortId: number;
}