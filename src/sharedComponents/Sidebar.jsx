import React from "react";
import MockData from "../assets/MOCK_DATA.json";

import Search from "../assets/images/search.svg";
import Messenger from "../assets/images/messenger.svg";
import FilledStar from "../assets/images/star.svg";
// import FilledStar from '../assets/images/star-not-fill.svg';

function SideBar(props) {
  const [allusers, setAllUsersList] = React.useState([]);
  const [users, setUsersList] = React.useState([]);
  const [filterdata, setFilterdata] = React.useState("all");
  const [searchValue, setSearchValue] = React.useState("");

  let timer = null;

  const delaySearch = (value, delay) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const SearchUsers = allusers.filter((item) => {
        if (filterdata === "followup") {
          return (
            item.isFavorite &&
            item.fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        } else {
          return (
            item.fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        }
      });
      setUsersList(SearchUsers);
    }, delay);
  };

  const handleSetAsFavourite = (value, selectedUser, index) => {
    let rows = users;
    if (value) {
      selectedUser.isFavorite = false;
    } else {
      selectedUser.isFavorite = true;
    }
    rows[index] = selectedUser;
    setUsersList([...rows]);
  };

  React.useEffect(() => {
    if (users.length === 0) {
      let data = MockData;
      if (data.length > 0) {
        data = data.map((d) => ({
          ...d,
          fullName: `${d.firstName} ${d.lastName}`,
        }));
        setUsersList(data);
        setAllUsersList(data);
      }
    }
  }, [users]);

  const handleOnSearchInput = (value) => {
    setSearchValue(value);
    delaySearch(value, 1000);
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    let userinfo;
    if (value === "followup") {
      userinfo = allusers.filter((item) => item.isFavorite);
    } else {
      userinfo = allusers;
    }

    if (searchValue) {
      userinfo = userinfo.filter(
        (item) =>
          item.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    }
    setFilterdata(e.target.value);
    setUsersList(userinfo);
  };

  const handleClick = (user) => {
    props.selecteUser(user);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-sec">
        <div className="sidebar-header-wrapper">
          <div className="searchbar-wrapper">
            <img className="search-icon" src={Search} />
            <input
              type="text"
              placeholder="Search or a new chat"
              className="form-control"
              onChange={(e) => handleOnSearchInput(e.target.value)}
            />
            <button className="btn-new-chat">
              <img src={Messenger} alt="" />
            </button>
          </div>
          <div className="dropdown-wrapper">
            <div class="form-group conversation-block">
              <select
                class="form-control"
                onChange={handleSelect}
                value={filterdata}
              >
                <option value="all">All Conversations</option>
                <option value="followup">followup</option>
              </select>
            </div>
            {/* <button className="btn-followup">Follow up</button> */}
          </div>
        </div>
        <div className="sidebar-menu">
          <ul>
            {users && users.length > 0
              ? users.map((user, keyIdx) => {
                  return (
                    <li
                      key={`${user.id}-${keyIdx}`}
                      onClick={() => handleClick(user)}
                    >
                      <a>
                        <span className="icon"></span>
                        <div className="user-short-info">
                          <div className="left-wrapper">
                            <span className="nav-list user-name">
                              {" "}
                              {`${user?.fullName}`}
                            </span>
                            <span className="nav-list user-info">
                              {" "}
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry
                            </span>
                          </div>
                          <div className="right-wrapper">
                            <span className="hours">23h</span>
                            <span
                              key={`${user.id}-${keyIdx}-${user?.firstName}`}
                              className={`favourite${
                                user && user.isFavorite ? " active" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetAsFavourite(
                                  user.isFavorite,
                                  user,
                                  keyIdx
                                );
                              }}
                            >
                              <img src={FilledStar} />
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })
              : undefined}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
