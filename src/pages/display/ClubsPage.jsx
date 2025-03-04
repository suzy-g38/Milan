import React from "react";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";
import SingleClubEvent from "../../components/SingleClubEvent";
import useSWR from "swr";
import { defaultfetcher } from "../../utils/fetcher";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ClubsPage = () => {
  const { data: clubData, isLoading } = useSWR(
    `${import.meta.env.VITE_MILANAPI}/display/clubs`,
    defaultfetcher,
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Milan | Clubs </title>
        <meta
          name="description"
          content="These are the clubs and communities you can follow, you can attend charity/club events and even get notified about it once you subscribe !"
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <Navbar />

      <div className="container">
        <div className="cp_main_parent">
          <div className="cp_subparent">
            <div className="cp_textdiv">
              <p className="cp_header1">Clubs and communities !</p>
              <p className="cp_header2">
                Here are some clubs you can follow, you can attend charity/club
                events and even get notified about it once you subscribe !
              </p>
            </div>
          </div>

          <div className="cp_cardsdiv">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {clubData?.map((club) => {
                  return <SingleClubEvent key={club?._id} club={club} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ClubsPage;
