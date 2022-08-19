import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import NavBar from "./../Navbar"
import MiniChart from "../coinList/MiniChart"
import axios from "axios";
import { element } from "prop-types";
import NumberFormat from "react-number-format";
import { Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const Portfolio = () => {
  const [history, setHistory] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [status, setStatus] = useState();
  const [coinInfoMap, setCoinInfoMap] = useState(new Map());

  useEffect(() => {
    const getData = async () => {
      fetchGrahp();
      fetchCoins();
    };

    const fetchGrahp = async () => {
      await axios
        .get("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1")
        .then((data) => setHistory(data.data));
    };

    const fetchCoins = async () => {
      await axios
        .get(
          "http://localhost:8080/api/portfolio/getAll", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          auth: {
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
          },
        })
        .then(async (data) => {
          console.log(data.data.data);
          for (const element of data.data.data) {
            await fetchSingleCoinInfo(element.coinName);
          }
          setPortfolio(data.data.data);
          setStatus(true);
        })
        .catch((e) => console.log(e));
    };

    const fetchSingleCoinInfo = async (name) => {
      await axios
        .get(
          "http://localhost:8080/api/assets/getByName/" + name, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          auth: {
            username: "sergio.bernal",
            password: "1234",
          },
        })
        .then((data) => {
          coinInfoMap.set(name, data.data.data);
          console.log(data.data.data.priceUsd);
        })
        .catch((e) => console.log(e));
    };

    getData();
  }, []);
  
  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Sidebar />
        <Content>
          <Chart>
            <div>
              <Balance>
                <BalanceTitle>Portfolio balance</BalanceTitle>
                <BalanceValue>{"$"}</BalanceValue>
              </Balance>
            </div>
            <MiniChart history={history} />
          </Chart>
          <PortfolioTable>
            <TableItem>
              <Title>Your Assets</Title>
            </TableItem>
            <Divider />
            <Table>
              <TableItem>
                <TableRow>
                  <div style={{ flex: 3 }}>Name</div>
                  <div style={{ flex: 2 }}>Balance</div>
                  <div style={{ flex: 2 }}>Allocation</div>
                  <div style={{ flex: 0, color: "#0a0b0d" }}></div>
                </TableRow>
              </TableItem>
              <Divider />
              <div>
                {coinInfoMap.size === 0 ? (
                  <LinearProgress />
                ) : (
                  portfolio.map((coin) => (
                    <div key={coin.name}>
                      <TableItem>
                        <TableRow>
                          <div style={{ flex: 3 }}>
                            <div style={{ flex: 1.4 }}>
                              <NameCol>
                                <CoinIcon>
                                  <img
                                    src={coinInfoMap.get(coin.coinName).logo}
                                    alt=""
                                  />
                                </CoinIcon>
                                <div>
                                  <Primary>{coin.coinName}</Primary>
                                  <Secondary>
                                    {coinInfoMap.get(coin.coinName).symbol}
                                  </Secondary>
                                </div>
                              </NameCol>
                            </div>
                          </div>
                          <div style={{ flex: 2 }}>
                            <NumberFormat
                              value={coinInfoMap.get(coin.coinName).priceUsd}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </div>
                          <div style={{ flex: 2 }}>
                            {coinInfoMap.get(coin.coinName).priceUsd * 100} %
                          </div>
                          <div style={{ flex: 0, color: "#0a0b0d" }}></div>
                        </TableRow>
                      </TableItem>
                    </div>
                  ))
                )}
              </div>
            </Table>
          </PortfolioTable>
        </Content>
      </Wrapper>
    </>
  );
};

export default Portfolio;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 130px;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`;

const Table = styled.div`
  width: 100%;
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > th {
    text-align: left;
  }
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const NameCol = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 1.8rem;
  margin-right: 1rem;
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
`;
