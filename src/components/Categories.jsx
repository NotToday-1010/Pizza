import {useDispatch, useSelector} from "react-redux";
import {selectFilterCategoryID, setCategory} from "../redux/slices/filterSlice";

const Categories = () => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const categoryID = useSelector(selectFilterCategoryID)
    const dispatch = useDispatch()

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, num) =>
                    <li key={num} onClick={() => dispatch(setCategory(num))}
                        className={categoryID === num ? "active" : ''}>{category}</li>
                )}
            </ul>
        </div>
    );
}

export default Categories