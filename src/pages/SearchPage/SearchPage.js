import React, { useCallback, useEffect, useState } from "react";
import "./SearchPage.css";

import { useParams } from "react-router-dom";
import { searchTasks, setSearchInput } from "../../store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

import Page from "../../components/Page/Page";
import SearchForm from "../../components/SearchForm/SearchForm";
import List from "../../components/List/List";
import TaskElement from "../../components/TaskElement/TaskElement";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchInput } = useParams();

  const { search } = useSelector((state) => state.tasks);

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const searchForTasks = useCallback(async () => {
    if (searchInput && searchInput !== search.input) {
      dispatch(setSearchInput(searchInput));

      setWaitingForResponse(true);
      await dispatch(searchTasks(searchInput));
      setWaitingForResponse(false);
    }
  }, [dispatch, search.input, searchInput]);

  useEffect(() => searchForTasks(), [searchForTasks]);

  return (
    <Page
      title={searchInput ? `Search results for "${search.input}"` : "Search"}
    >
      <SearchForm />
      {waitingForResponse ? (
        <div className="search__loading">
          <LoadingIndicator />
        </div>
      ) : (
        <List className="search__list">
          {searchInput &&
            search.results.map((task) => (
              <li key={task.id}>
                <TaskElement task={task} />
              </li>
            ))}
        </List>
      )}
    </Page>
  );
};

export default SearchPage;
