const categories = ['História', 'Filosofia', 'Romance', 'Direito'];

const CategoryFilter = ({ onSelectCategory, selectedCategory }) => {
    return (
        <div className="flex justify-center my-4">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`${
                        selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                    } font-bold py-2 px-4 rounded mx-2`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
