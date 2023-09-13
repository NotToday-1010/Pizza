import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/slices/filterSlice";

const Categories = () => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const categoryID = useSelector(state => state.filter.categoryID)
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