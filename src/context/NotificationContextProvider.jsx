import React, { useState } from "react";

const NotificationContext = React.createContext();

const NotificationContextProvider = ({ children }) => {
  const [notificationNumber, setNotificationNumber] = React.useState(0);
  const [selectedFilters, setSelectedFilters] = useState("");
  const [songs, setSongs] = useState(false);
  const [filter, setFilter] = useState(false);
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const [songAddedToPlaylist, setSongAddedToPlaylist] = useState(null);

  return (
    <NotificationContext.Provider
      value={{
        addedToPlaylist,
        setAddedToPlaylist,
        songAddedToPlaylist,
        setSongAddedToPlaylist,
        notificationNumber,
        setNotificationNumber,
        selectedFilters,
        setSelectedFilters,
        songs,
        setSongs,
        filter,
        setFilter,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
