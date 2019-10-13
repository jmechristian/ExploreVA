import React from 'react';

const DisplayContent = () => {
  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        <div className="flex justify-left w-3/4 text-4xl font-extrabold">
          Place We Went
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <div className="text-indigo-300 text-sm font-bold mb-2 uppercase">
            What was happening?
          </div>
          <div className="text-white font-semibold text-xl">
            This Will Be the Title of Where.
          </div>
        </div>
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <div className="text-indigo-300 text-sm font-bold mb-2 uppercase">
            What Did We Get Up to?
          </div>
          <div className="text-white">
            Lucas ipsum dolor sit amet dantooine maul organa boba lars organa
            alderaan maul moff darth. Yoda skywalker calamari organa. Moff solo
            skywalker vader kamino. Mace sith darth kit lars darth. Moff jinn
            moff antilles organa. Hutt darth palpatine mace darth wampa mara.
            Droid biggs chewbacca mothma mon yavin dooku solo leia.
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-3/4">
          <div className="mb-4">
            <img src="https://via.placeholder.com/140x100" alt="mom" />
          </div>
          <div>
            <img src="https://via.placeholder.com/140x100" alt="image2" />
          </div>
          <div>
            <img src="https://via.placeholder.com/140x100" alt="image3" />
          </div>
          <div>
            <img src="https://via.placeholder.com/140x100" alt="image4" />
          </div>
          <div>
            <img src="https://via.placeholder.com/140x100" alt="image6" />
          </div>
          <div>
            <img src="https://via.placeholder.com/140x100" alt="image5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
