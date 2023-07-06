import React from "react";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

// функциональный компонент, отображающий подробную информацию об ингредиенте
const Ingredient = () => {
  // возвращает разметку, которая содержит подробную информацию об ингредиенте
  return (
    <div className="mt-15 p-15">
      <IngredientDetails />
    </div>
  );
};

export default React.memo(Ingredient);
