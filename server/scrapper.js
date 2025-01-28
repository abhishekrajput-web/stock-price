// import axios from 'axios';
// import fs from 'fs';

// axios
//   .get('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050', {
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
//       Accept: '/',
//       'Accept-Encoding': 'gzip, deflate, br, zstd',
//       'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
//       Cookie: '_ga=GA1.1.887963696.1737917672; bm_mi=017740FE718CD85EE9FE2B3A912B0E76~YAAQjc8uF4B4z6eUAQAA9JQAqRo0g+r5Evm8XL6QThm7/BDuyHrVx22l8iLaxSN4TQ2tfp5gPKrfm+T1iBRorLBatVJrEbDz42QIGdoXhKES4zSwt0c7CEcsLjEwpQQa/MFyzI9YuAab2CBGJb5GOo24QIeF6h+GRzOms6VjvMpH68YpFFoy09HNe5oPgJNc2m8FJrg7U1O9e/dOazaEjQJr9Ql51GJbizxBw4aSHKUnulbs65shSBlV4f96+bD0+Z7Ht70a12ZUpHWJ1eoPGcb7bBw+5rILAf4vjE0puBri/oQNULQR8V7Ptj1CnutBkfDOrYmAG95N46iXpR6Q8a4jTJ/bEKnvHbNOXMq8NDiY6Pq4HtZ+~1; nsit=TEWhspfLt4UIuXQGcpg13vRv; nseQuoteSymbols=[{"symbol":"BRITANNIA","identifier":"","type":"equity"}]; AKA_A2=A; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTczODAwODA1MywiZXhwIjoxNzM4MDE1MjUzfQ.Lr1M5XsxNQe92d3QV7Huo86h9gh7J3iGlfe_nSTcFaI; bm_sz=4694FAA2B1CFFE281385061ABAAA03E2~YAAQjc8uF9Uk06eUAQAA9kZaqRp67/1a+F+AIzRSUPZNiMlikDwv2xGzG/c7aSgaCC/B9rmci5YAzF/eUCl4TuWPdCXIykekzm+lb2hYM1fHwcOTsolw2x7z0GAtYSO6mm7CD6+emQhug84O7kR7Iuh2G5TqPnfLEQoPJwKXJPAyAtKQ2wfdE/Q3DZekJTDPHMw2gSMqSDf+RtH0sJE/APihIx3RWQdyMm6bqr2TCdnQ5AknPbqJowe/ppQK6qvn8wgOiYX8lsCmzKG4L015TCw7p+GZEpWFeYEHlvKGFGNJBN4nlqRyLwB8iKrZ0Rwyaz6qqtzJ4tpaAdtMMCmrZDxNj0NOcQQgqJmDLsY0iVABJb02cYifgxIo+juis6MZA3VKEM5pSdk8VPyxUtIrIl3lYBoHvpWc5GogMsVXvaVbNk8OjcnUlkq9lfIjTsV7CFZNDx/MmLuxoo5vm92jSWEh5b5KJ75+F5B1KJ5YGdiQgN0v0w8h24Rr2os0zwqvz/k+Rn4hDQoM06g1+nIFW5PNiqonh1/yyj1+rhK6DHT1cZuK5Kak87YYZZWrtSzVAgskOz95NVmBW2pPk+XuTQ==~3289666~3224899',
//       Referer: 'https://www.nseindia.com/market-data/live-equity-market',
//       'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
//       'sec-ch-ua-mobile': '?0',
//       'sec-ch-ua-platform': '"Windows"',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'same-origin',
//     },
//     timeout: 10000,
//   })
//   .then((response) => {
//     const apiData = response.data;

//     // Extract and map data to desired format
//     const formattedData = apiData.data.map((item) => ({
//       priority: item.priority,
//       symbol: item.symbol,
//       identifier: item.identifier,
//       series: item.series,
//       open: item.open,
//       dayHigh: item.dayHigh,
//       dayLow: item.dayLow,
//       lastPrice: item.lastPrice,
//       previousClose: item.previousClose,
//       change: item.change,
//       pChange: item.pChange,
//       totalTradedVolume: item.totalTradedVolume,
//       stockIndClosePrice: item.stockIndClosePrice,
//       totalTradedValue: item.totalTradedValue,
//       lastUpdateTime: item.lastUpdateTime,
//       yearHigh: item.yearHigh,
//       ffmc: item.ffmc,
//       yearLow: item.yearLow,
//       nearWKH: item.nearWKH,
//       nearWKL: item.nearWKL,
//       perChange365d: item.perChange365d,
//       date365dAgo: item.date365dAgo,
//       chart365dPath: item.chart365dPath,
//       date30dAgo: item.date30dAgo,
//       perChange30d: item.perChange30d,
//       chart30dPath: item.chart30dPath,
//       chartTodayPath: item.chartTodayPath,
//       meta: item.meta,
//     }));

//     // Write formatted data to a JSON file
//     fs.writeFile('nifty50Data.json', JSON.stringify(formattedData, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing to JSON file:', err);
//       } else {
//         console.log('Data successfully written to nifty50Data.json');
//       }
//     });
//   })
//   .catch((error) => {
//     console.error('Error fetching the API:', error);
//   });


// import axios from 'axios';
// import fs from 'fs';

// const fetchETFData = async () => {
//   try {
//     const response = await axios.get(
//       'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20ETF',
//       {
//         headers: {
//           'User-Agent':
//             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
//           Accept: '/',
//           'Accept-Encoding': 'gzip, deflate, br, zstd',
//           'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
//           Cookie:
//             '_ga=GA1.1.887963696.1737917672; bm_mi=017740FE718CD85EE9FE2B3A912B0E76~YAAQjc8uF4B4z6eUAQAA9JQAqRo0g+r5Evm8XL6QThm7/BDuyHrVx22l8iLaxSN4TQ2tfp5gPKrfm+T1iBRorLBatVJrEbDz42QIGdoXhKES4zSwt0c7CEcsLjEwpQQa/MFyzI9YuAab2CBGJb5GOo24QIeF6h+GRzOms6VjvMpH68YpFFoy09HNe5oPgJNc2m8FJrg7U1O9e/dOazaEjQJr9Ql51GJbizxBw4aSHKUnulbs65shSBlV4f96+bD0+Z7Ht70a12ZUpHWJ1eoPGcb7bBw+5rILAf4vjE0puBri/oQNULQR8V7Ptj1CnutBkfDOrYmAG95N46iXpR6Q8a4jTJ/bEKnvHbNOXMq8NDiY6Pq4HtZ+~1; nsit=TEWhspfLt4UIuXQGcpg13vRv; nseQuoteSymbols=[{"symbol":"BRITANNIA","identifier":"","type":"equity"}]; AKA_A2=A; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTczODAwODA1MywiZXhwIjoxNzM4MDE1MjUzfQ.Lr1M5XsxNQe92d3QV7Huo86h9gh7J3iGlfe_nSTcFaI; bm_sz=4694FAA2B1CFFE281385061ABAAA03E2~YAAQjc8uF9Uk06eUAQAA9kZaqRp67/1a+F+AIzRSUPZNiMlikDwv2xGzG/c7aSgaCC/B9rmci5YAzF/eUCl4TuWPdCXIykekzm+lb2hYM1fHwcOTsolw2x7z0GAtYSO6mm7CD6+emQhug84O7kR7Iuh2G5TqPnfLEQoPJwKXJPAyAtKQ2wfdE/Q3DZekJTDPHMw2gSMqSDf+RtH0sJE/APihIx3RWQdyMm6bqr2TCdnQ5AknPbqJowe/ppQK6qvn8wgOiYX8lsCmzKG4L015TCw7p+GZEpWFeYEHlvKGFGNJBN4nlqRyLwB8iKrZ0Rwyaz6qqtzJ4tpaAdtMMCmrZDxNj0NOcQQgqJmDLsY0iVABJb02cYifgxIo+juis6MZA3VKEM5pSdk8VPyxUtIrIl3lYBoHvpWc5GogMsVXvaVbNk8OjcnUlkq9lfIjTsV7CFZNDx/MmLuxoo5vm92jSWEh5b5KJ75+F5B1KJ5YGdiQgN0v0w8h24Rr2os0zwqvz/k+Rn4hDQoM06g1+nIFW5PNiqonh1/yyj1+rhK6DHT1cZuK5Kak87YYZZWrtSzVAgskOz95NVmBW2pPk+XuTQ==~3289666~3224899',
//           Referer: 'https://www.nseindia.com/market-data/live-equity-market',
//           'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
//           'sec-ch-ua-mobile': '?0',
//           'sec-ch-ua-platform': '"Windows"',
//           'sec-fetch-dest': 'empty',
//           'sec-fetch-mode': 'cors',
//           'sec-fetch-site': 'same-origin',
//         },
//         timeout: 10000,
//       }
//     );

//     const apiData = response.data;

//     // Extract and map data to desired format
//     const formattedData = apiData.data.map((item) => ({
//       priority: item.priority,
//       symbol: item.symbol,
//       identifier: item.identifier,
//       series: item.series,
//       open: item.open,
//       dayHigh: item.dayHigh,
//       dayLow: item.dayLow,
//       lastPrice: item.lastPrice,
//       previousClose: item.previousClose,
//       change: item.change,
//       pChange: item.pChange,
//       totalTradedVolume: item.totalTradedVolume,
//       stockIndClosePrice: item.stockIndClosePrice,
//       totalTradedValue: item.totalTradedValue,
//       lastUpdateTime: item.lastUpdateTime,
//       yearHigh: item.yearHigh,
//       ffmc: item.ffmc,
//       yearLow: item.yearLow,
//       nearWKH: item.nearWKH,
//       nearWKL: item.nearWKL,
//       perChange365d: item.perChange365d,
//       date365dAgo: item.date365dAgo,
//       chart365dPath: item.chart365dPath,
//       date30dAgo: item.date30dAgo,
//       perChange30d: item.perChange30d,
//       chart30dPath: item.chart30dPath,
//       chartTodayPath: item.chartTodayPath,
//       meta: item.meta,
//     }));

//     // Write formatted data to a JSON file
//     fs.writeFile('niftyETFData.json', JSON.stringify(formattedData, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing to JSON file:', err);
//       } else {
//         console.log('ETF Data successfully written to niftyETFData.json');
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching the ETF API:', error);
//   }
// };

// // Call the function
// fetchETFData();
