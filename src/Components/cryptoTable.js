import React from "react";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { SingleCryptoInfo } from "../SingleCryptoInfo/SingleCryptoInfo";
import { fetchCryptoCoins } from "../store/cryptoSlice";

const CryptoTable = () => {
  const dispatch = useDispatch();
  const { cryptoCoins } = useSelector((state) => state.cryptoCoins);
  const isLoading = useSelector((state) => state.cryptoCoins.isLoading);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  useEffect(() => {
    dispatch(fetchCryptoCoins(page)); // eslint-disable-next-line
  }, [page]); // eslint-disable-next-line
  // eslint-disable-next-line

  console.log("api hit ", cryptoCoins);

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      width: "5%",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      width: "5%",
      render: (symbol) => (
        <span className="flex gap-3">
          {symbol}{" "}
          <img
            className=" w-5  "
            src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
            alt="logo"
          />
        </span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      render: (priceUsd) => `${Number(priceUsd).toFixed(2)}`,
    },
    {
      title: "Market Cap",
      dataIndex: "volumeUsd24Hr",
      render: (marketCapUsd) => `${Number(marketCapUsd).toFixed(2)}`,
    },
    {
      title: "VWAP 24hrs",
      dataIndex: "volumeUsd24Hr",
      render: (volumeUsd24Hr) => `${Number(volumeUsd24Hr).toFixed(2)}`,
    },
    {
      title: "Supply",
      dataIndex: "supply",
      render: (supply) =>
        `${
          Math.abs(Number(supply)) >= 1.0e6
            ? (Math.abs(Number(supply)) / 1.0e6).toFixed(2) + "m"
            : 0
        }`,
    },
    {
      title: "Volume 24hr",
      dataIndex: "volumeUsd24Hr",
      render: (volumeUsd24Hr) =>
        `${
          Math.abs(Number(volumeUsd24Hr)) >= 1.0e9
            ? (Math.abs(Number(volumeUsd24Hr)) / 1.0e9).toFixed(2) + "b"
            : 0
        }`,
    },
    {
      title: "Change 24hr",
      dataIndex: "changePercent24Hr",
      render: (changePercent24Hr) => (
        <span>
          {changePercent24Hr < 0 ? (
            <span className="text-red-500">
              {Number(changePercent24Hr).toFixed(2)} %
            </span>
          ) : (
            <span className="text-green-500">
              {" "}
              {Number(changePercent24Hr).toFixed(2)}%
            </span>
          )}
        </span>
      ),
    },
  ];

  const changePage = () => {
    setPage((pre) => pre + 1);
  };
  return (
    <div className="flex justify-center">
      <div className="-mt-28 z-10 container">
        <div>
          <Table
            rowKey="rank"
            columns={columns}
            dataSource={cryptoCoins}
            pagination={{
              defaultPageSize: 50,
            }}
            loading={isLoading}
          ></Table>
          <div className="flex justify-center px-4">
            <button
              className="bg-green-400 h-10 w-20 rounded-lg "
              onClick={changePage}
            >
              loadmore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
