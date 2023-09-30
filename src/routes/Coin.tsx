import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchCoinInfo, fetchCoinPriceInfo } from "../api";
import { Helmet } from "react-helmet";
import { Chart } from "./Chart";
import { Price } from "./Price";
import { IPriceData } from "../type";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';

interface RouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as { state: RouteState };
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const navigate = useNavigate();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId || "")
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinPriceInfo(coinId || ""),
    { refetchInterval: 5000 }
  );

  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <Title>
          {typeof state === "string"
            ? state
            : loading
            ? "Loading..."
            : infoData?.name}
        </Title>
      </Helmet>
      <Header>
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} style={{cursor: "pointer"}}/>
        <Title>
          {typeof state === "string"
            ? state
            : loading
            ? "Loading..."
            : infoData?.name}
        </Title>
        <FontAwesomeIcon icon={faHouse} onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null ? true : false}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null ? true : false}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {chartMatch ? (
            <Chart coinId={coinId} />
          ) : (
            <Price priceLoading={priceLoading} priceData={priceData} />
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.itemColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.itemColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export default Coin;
