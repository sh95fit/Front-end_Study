import React, { useContext, useState, useEffect } from 'react';
// import { mockHistoricalData } from '../constants/mock';

import { convertUnixTimestampToDate, convertDateToUnixTimestamp, createDate } from '../helpers/data-helper';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';

import Card from './Card';

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import ChartFilter from './ChartFilter';
import { chartConfig } from '../constants/config'
import ThemeContext from '../context/ThemeContext';

const Chart = () => {

  const { darkMode } = useContext(ThemeContext);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");

  const { stockSymbol } = useContext(StockContext);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value : item.toFixed(2),
        date : convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  useEffect(() => {
    const getDataRange = () => {
      const {days, weeks, months, years} = chartConfig[filter];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate)
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);

      return {startTimestampUnix, endTimestampUnix};
    };

    const updateChartData = async () => {
      try {
        const {startTimestampUnix, endTimestampUnix} = getDataRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(stockSymbol, resolution, startTimestampUnix, endTimestampUnix);

        setData(formatData(result));
      } catch (error) {
        setData([])
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className = "absolute z-40 flex top-2 right-2">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item)}}
                />
            </li>
          )
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                // stopColor="rgb(199 210 254)"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                // stopColor="rgb(199 210 254)"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip
            contentStyle={darkMode ? {backgroundColor:"#111827"} : null}
            itemStyle={darkMode ? {color:"#818cf8"} : null}
          />
          <XAxis dataKey={"date"}/>
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chart
