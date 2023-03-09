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

  useEffect(() => {
    dispatch(fetchCryptoCoins(page));
  }, [page]);

  console.log("api hit ", cryptoCoins);

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",

      width: "20%",
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
      render: (changePercent24Hr) => `${Number(changePercent24Hr).toFixed(2)}`,
    },
  ];

  const changePage = () => {
    setPage((pre) => pre + 1);
  };
  return (
    <div>
      <h1 className="flex justify-center text-5xl py-2">Crypto Table</h1>

      <div>
        <Table
          columns={columns}
          dataSource={cryptoCoins}
          pagination={{
            defaultPageSize: 50,
          }}
          loading={isLoading}
        ></Table>
        <div className="flex justify-end px-4">
          <button
            className="bg-green-400 h-10 w-20 rounded-lg "
            onClick={changePage}
          >
            loadmore
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
