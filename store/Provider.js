import React, {useState} from 'react';
import Context from './context';

const Provider = props => {

    const [products , setProducts] = useState( [] );
    const [user, setUser] = useState(null); // Track user authentication state

    // const value = {}

    const contextValue = {
        products , setProducts,
        user , setUser
        
    }


    return (
      <Context.Provider
      value={contextValue}
      >
        {props.children}
      </Context.Provider>  
    );
};


export default Provider;