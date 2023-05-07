import PropTypes from "prop-types";

// описывают ожидаемые типы пропсов объекта и могут быть использованы в других компонентах для проверки передаваемых пропсов
export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export const ingredientDetailsPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
