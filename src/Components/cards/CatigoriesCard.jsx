import React from "react";
import "../../index.css";
import "../../assests/CatigoriesCard.css";
import { categories } from "../../assests/categories";
const CatigoriesCard = () => {
  return (
    <>
      <div className="cards ">
        {categories &&
          categories.map((category, i) => (
            <div
              className="card "
              style={{ backgroundImage: `url(${category.image})` }} // Fix here
              key={i} // Don't forget to add a key when mapping over an array
            >
              <div className="card-body">
                <h2 className="title">{category.title}</h2>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CatigoriesCard;
