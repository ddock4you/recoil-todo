import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryList, categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

interface INewCategory {
    newCategory: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const setCategories = useSetRecoilState(categoryList);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        setValue: setValue2,
    } = useForm<INewCategory>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => {
            const addToDos = [
                { text: toDo, id: Date.now(), category },
                ...oldToDos,
            ];
            localStorage.setItem("toDoList", JSON.stringify(addToDos));
            return addToDos;
        });
        setValue("toDo", "");
    };

    const addCategoryVaild = ({ newCategory }: { newCategory: string }) => {
        setCategories((oldCategories) => {
            const addCategory = [...oldCategories, newCategory];
            localStorage.setItem("categoryList", JSON.stringify(addCategory));
            return [...oldCategories, newCategory];
        });
        setValue2("newCategory", "");
    };

    return (
        <>
            <form onSubmit={handleSubmit2(addCategoryVaild)}>
                <input
                    {...register2("newCategory", {
                        required: "Please write a new category",
                    })}
                    placeholder="Write a new category"
                />
                <button>Add</button>
            </form>
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
        </>
    );
}

export default CreateToDo;
