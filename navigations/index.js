import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Navigation = () => {
    const [token, setToken] = useState(null); //TODO: can be implemented when global state is available

    return (
      <NavigationContainer>
        <AuthStack  />
        {/* {token ? <AppStack /> : <AuthStack  />} */}
      </NavigationContainer>
    );
};

export default Navigation;

  
    
      
      
        


