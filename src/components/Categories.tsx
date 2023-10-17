import {useSelector} from "react-redux";
import {selectFilterCategoryID} from "../redux/slices/filterSlice";
import React, {FC} from "react";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
    onChangeCategory: (idx: number) => void
}

const Categories: FC<CategoriesProps> = React.memo(({onChangeCategory}) => {
        const categoryID = useSelector(selectFilterCategoryID)

        return (
            <div className='categories'>
                <ul>
                    {categories.map((category, idx) =>
                        <li key={idx} onClick={() => onChangeCategory(idx)}
                            className={categoryID === idx ? "active" : ''}>{category}</li>
                    )}
                </ul>
            </div>
        );
    }
)
export default Categories