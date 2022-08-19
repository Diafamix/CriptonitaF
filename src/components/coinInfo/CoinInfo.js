import styled from 'styled-components'
import NavBar from '../Navbar'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'
import axios from "axios";
import MiniChart from '../coinList/MiniChart'
import { useParams } from 'react-router';

const CoinInfo = () => {

    const [history, setHistory] = useState([]);
    const { coin } = useParams();

    useEffect(() => {
        fetchGrahp()
    }, [])

    const fetchGrahp = async () => {
        await axios
            .get("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1")
            .then((data) => setHistory(data.data));
    };

    const imgStyle = { height: 40, width: 40 };

    return (
        <>
            <NavBar></NavBar>
            <Wrapper>

                <TitleContainer>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FirstTitleContainer>
                                <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" style={imgStyle} />
                                <Typography variant="h4" display="block" style={{ color: 'white', marginLeft: '20px', marginTop: '1px', fontWeight: 'bold' }}>Bitcoin</Typography>
                                <SymbolContainer>
                                    <Typography variant="body1" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '12px', marginLeft: '10px', marginRight: '10px' }}>BTC</Typography>
                                </SymbolContainer>
                            </FirstTitleContainer>

                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2" display="block" style={{ color: '#8a919e', fontWeight: 'bold' }}>Bitcoin price (BTC)</Typography>
                            <SecondTitleContainer>
                                <Typography variant="h4" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '6px' }}>$24,023.77</Typography>
                                <NegativeContainer>
                                    <MdKeyboardArrowUp style={{ marginTop: '15px', marginLeft: '10px' }} />
                                    <Typography variant="body1" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>0.01%</Typography>
                                </NegativeContainer>

                            </SecondTitleContainer>

                            <Divider style={{ marginTop: '40px', marginBottom: '10px' }} />

                            <Grid container spacing={2}>

                                <Grid item xs={3}>
                                    <Typography variant="body2" display="block" style={{ color: '#a1a7bb', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>Market Cap</Typography>
                                    <Typography variant="body2" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>$459,939,862,561</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="body2" display="block" style={{ color: '#a1a7bb', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>Market Cap</Typography>
                                    <Typography variant="body2" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>$459,939,862,561</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="body2" display="block" style={{ color: '#a1a7bb', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>Market Cap</Typography>
                                    <Typography variant="body2" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>$459,939,862,561</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="body2" display="block" style={{ color: '#a1a7bb', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>Market Cap</Typography>
                                    <Typography variant="body2" display="block" style={{ color: 'white', fontWeight: 'bold', marginTop: '12px', marginRight: '10px' }}>$459,939,862,561</Typography>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                </TitleContainer>

                <SecondPart>

                    <ChartContainer>
                        <Typography variant="h5" display="block" style={{ color: 'white', fontWeight: 'bold' }}>Bitcoin to USD Chart</Typography>
                        <ActualChartContainer>
                            <MiniChart history={history} />
                        </ActualChartContainer>
                    </ChartContainer>

                    <DescriptionContainer>
                        <Typography variant="h5" display="block" style={{ color: 'white', fontWeight: 'bold' }}>What Is Bitcoin (BTC)?</Typography>

                        <Typography variant="body1" style={{ color: '#8a919e', fontWeight: 'bold', marginTop: '20px' }}>Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.

                            Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.”

                            Some concepts for a similar type of a decentralized electronic currency precede BTC, but Bitcoin holds the distinction of being the first-ever cryptocurrency to come into actual use.
                        </Typography>
                    </DescriptionContainer>

                </SecondPart>
            </Wrapper>
        </>
    )

}

export default CoinInfo

const Wrapper = styled.div`
    padding-left: 80px;
    padding-right: 80px;
`

const TitleContainer = styled.div`
    margin-top: 120px;
    margin-left: 60px;
    margin-right: 60px;
    color: white;
`

const FirstTitleContainer = styled.div`
    display: flex;
    margin-top: 25px;
`

const SecondTitleContainer = styled.div`
    display: flex;
`

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const SymbolContainer = styled.div`
    margin-left: 15px;
    border-radius: 20px;
    text-align: center;
    background-color: #495057;
`

const SecondPart = styled.div`
    background-color: #181A20;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
    margin-top: 30px;
    margin-top: 80px;
    padding-top: 1px;
    padding-bottom: 100px;
`

const NegativeContainer = styled.div`
    display: flex;
    margin-left: 15px;
    border-radius: 20px;
    text-align: center;
    background-color: #ea3943;
`

const PositiveContainer = styled.div`
    display: flex;
    margin-left: 15px;
    border-radius: 20px;
    text-align: center;
    background-color: #16c784;;
`

const ChartContainer = styled.div`
    margin-top: 60px;
    margin-left: 60px;
    margin-right: 60px;
`

const DescriptionContainer = styled.div`
    margin-top: 60px;
    margin-left: 60px;
    margin-right: 60px;
`

const ActualChartContainer = styled.div`
    border: 1px solid #282b2f;
    margin-top: 30px;
    padding: 1rem 2rem;
`
