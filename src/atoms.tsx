import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

export type ICategoryList = string[];

const localCategoryList = localStorage.getItem("categoryList");
const localToDoList = localStorage.getItem("toDoList");

console.log(localCategoryList);
console.log(localToDoList);

export const categoryList = atom<ICategoryList>({
    key: "categoryList",
    default: localCategoryList
        ? JSON.parse(localCategoryList)
        : ["TO_DO", "DOING", "DONE"],
});

export const categoryState = atom<string>({
    key: "category",
    default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: localToDoList ? JSON.parse(localToDoList) : [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});
