import React from 'react';

const UserContext = React.createContext({company:'defult', setCompany: () => {}});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
