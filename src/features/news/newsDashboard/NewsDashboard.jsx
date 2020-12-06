import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Header, Loader } from "semantic-ui-react";
import { fetchNews } from "../newsRedux/newsActions";
import { RETAIN_STATE } from "../newsRedux/newsConstants";
import NewsList from "./NewsList";
import NewsListItemPlaceholder from "./NewsListItemPlaceholder";
import SponsorSection from "./SponsorSection";

export default function NewsDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {
    news,
    moreNews,
    filter,
    date,
    lastVisible,
    retainState,
  } = useSelector((state) => state.news);
  const { loading } = useSelector((state) => state.async);

  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;

    setLoadingInitial(true);

    dispatch(fetchNews(filter, date, limit)).then(() => {
      setLoadingInitial(false);
    });

    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, date, retainState]);

  function handleFetchNextNews() {
    dispatch(fetchNews(filter, date, limit, lastVisible));
  }

  return (
    <Grid stackable columns={2}>
      <Grid.Column mobile={16} tablet={12} computer={12}>
        {loadingInitial ? (
          <>
            <NewsListItemPlaceholder />
            <NewsListItemPlaceholder />
            <NewsListItemPlaceholder />
          </>
        ) : (
          <>
            <Header as="h1" content="Latest News" />
            <NewsList
              news={news}
              getNextNews={handleFetchNextNews}
              loading={loading}
              moreNews={moreNews}
            />
          </>
        )}
      </Grid.Column>

      <Grid.Column textAlign="left" mobile={16} tablet={4} computer={4}>
        <SponsorSection />
      </Grid.Column>

      <Grid.Column mobile={16} tablet={10} computer={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
